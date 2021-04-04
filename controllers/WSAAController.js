require('../libs/utils');

const e = require("express");
const forge = require('node-forge');
const ntpClient = require('ntp-client');
const SoapController = require('./SoapController');


const WSAAModel = require('../models/WSAAModel');
const WSAAService = require('../services/WSAAService');
const WSAAServiceInstance = new WSAAService(WSAAModel);

let validate = async function(req, res, next) {
    try {
        const ticket = await WSAAServiceInstance.findOne();
        if (ticket) {
            let dateNow = new Date();
            dateNow.setHours(dateNow.getHours() - 3);
            //console.log('validate ticket exp.time: ', ticket.expiration_time);

            //Existe, valida fecha de expiracion
            if (ticket.expiration_time <= dateNow) {
                //console.log('expiro fecha');

                //Se inactivan el/los vencidos
                await WSAAServiceInstance.updateMany();
                //Se ingresa el nuevo TA
                await createCMS();
            }
            next();
        } else {
            //No existe, se crea el CMS
            await createCMS();
            next();
        }
    } catch (e) {
        //console.log('catch validate()', e);
        res.render('index', { message: {}, errors: { message: e } });
    }
};

let createCMS = async function() {
    const loginTicketRequest = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>" +
        "<loginTicketRequest version=\"1.0\">" +
        "<header>" +
        " <uniqueId>pUniqueID</uniqueId>" +
        " <generationTime>pGenerationTime</generationTime>" +
        " <expirationTime>pExpirationTime</expirationTime>" +
        "</header>" +
        "<service>pWebService</service>" +
        "</loginTicketRequest>";


    let date = new Date();
    var pUniqueID = Math.floor(date.valueOf() / 1000);
    date.setHours(date.getHours() - 3);
    let pGenerationTime = date.toISOString();
    date.setDate(date.getDate() + 1);
    let pExpirationTime = date.toISOString();
    const pWebService = 'wscdc';

    //Replace values in Xml
    let loginTicketRequestxml = ((loginTicketRequest.replace(/pUniqueID/, pUniqueID))
        .replace(/pGenerationTime/, pGenerationTime)
        .replace(/pExpirationTime/, pExpirationTime)
        .replace(/pWebService/, pWebService));

    let pem = (process.env.AFIP_CRT).toString('utf8');
    let key = (process.env.AFIP_KEY).toString('utf8');
    let p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(loginTicketRequestxml, 'utf8');
    p7.addCertificate(pem);
    p7.addSigner({
        key: key,
        certificate: pem
    });
    p7.sign();
    let cms = forge.pkcs7.messageToPem(p7).replace(/-----BEGIN PKCS7-----/, "").replace(/-----END PKCS7-----/, "").replace(/\r\n/g, "");
    //console.log('pUniconst soap = require('soap');
    let ticket = { 'cms': cms };
    return await createTA(ticket);
};


let createTA = async function(data) {
    //Peticion soap para obtener el token/sign
    let TA_WSAA = await SoapController.soapReqLogin(data);

    if (!TA_WSAA.unique_id) {
        console.log('create error: TA_WSAA', TA_WSAA);
        return 'error';
    }

    //Se guarda el TA
    const ticket = await WSAAServiceInstance.create(TA_WSAA);
    return ticket;
};

let getTokenAndSign = async function() {
    console.log('getTokenAndSign');
    const token = await WSAAServiceInstance.findOne();
    return token;
};

module.exports = { validate, getTokenAndSign };