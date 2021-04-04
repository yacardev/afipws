const e = require('express');
const SoapController = require('./SoapController');

const WSCDCModel = require('../models/WSCDCModel');
const WSCDCService = require('../services/WSCDCService');
const WSCDCServiceInstance = new WSCDCService(WSCDCModel);


let create = async function(data) {
    try {
        console.log('creando wscdc');
        let WSCDC = await WSCDCServiceInstance.create(data);
        return WSCDC;
    } catch (e) {
        return e;
    }

};

let wscdcSoap = async function(token, wscdc) {
    try {
        console.log('wscdcSoap');
        await SoapController.soapWSCDC(token, wscdc);
        return await WSCDCServiceInstance.findByIdAndUpdate(wscdc);
    } catch (e) {
        return e;
    }
};


module.exports = { create, wscdcSoap };