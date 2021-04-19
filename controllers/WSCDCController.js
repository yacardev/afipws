const e = require('express');
const SoapController = require('./SoapController');

const WSCDCModel = require('../models/WSCDCModel');
const WSCDCService = require('../services/WSCDCService');
const WSCDCServiceInstance = new WSCDCService(WSCDCModel);


let create = async function(err, data) {
    try {
        console.log('creando wscdc');
        let WSCDC = await WSCDCServiceInstance.create(data);
        return [false, WSCDC];
    } catch (err) {
        return [err.message, WSCDC];
    }

};

async function wscdcSoap(err, token, wscdc) {
    console.log('wscdcSoap');
    let wscdcErr;
    let WSCDCSoap = wscdc;
    try {
        //Se llama a la ejecucion del servicio SOAP
        [wscdcErr, token, WSCDCSoap] = await SoapController.soapWSCDC(false, token, wscdc);
    } catch (err) {
        //console.log('err controller 1', err.message);
        wscdcErr = err.message;
    }
    //Se guarda el resultado/error de SOAP
    await findByIdAndUpdate(wscdcErr, WSCDCSoap);
    return [wscdcErr, token, WSCDCSoap];


};

async function findByIdAndUpdate(err, data) {
    try {
        //Se guarda la informacion del servicio
        if (err) data.req_error = err;
        await WSCDCServiceInstance.findByIdAndUpdate(data);
        return [false, data];
    } catch (err) {
        //console.log('err controller 2', err.message);
        return [err.message, wscdc];
    }
};

/*
async function wscdcSoap(err, token, wscdc) {
    console.log('wscdcSoap');
    let wscdcErr;
    let WSCDCSoap;
    try {
        //Se llama a la ejecucion del servicio SOAP

        [wscdcErr, token, WSCDCSoap] = await SoapController.soapWSCDC(false, token, wscdc);
        if (wscdcErr) {
            //console.log('wscdcSoap wscdcErr', wscdcErr);
            return [wscdcErr, token, WSCDCSoap];
        }
    } catch (err) {
        //console.log('err controller 1', err.message);
        return [err.message, token, wscdc];
    }

    try {
        //Se guarda la informacion del servicio
        //console.log('antes findByIdAndUpdate', WSCDCSoap);
        await WSCDCServiceInstance.findByIdAndUpdate(WSCDCSoap);
        //console.log('wscdcSoap return WSCDCUpd:', WSCDCSoap);
        return [false, token, WSCDCSoap];
    } catch (err) {
        //console.log('err controller 2', err.message);
        return [err.message, token, wscdc];
    }
};
*/
module.exports = { create, wscdcSoap };