/*
const TicketModel = require('../../models/TicketModel');
const TicketService = require('../../services/TicketService');
const WSAAController = require('../../controllers/WSAAController');

const TicketServiceInstance = new TicketService(TicketModel);
const WSAAControllerInstance = new WSAAController(TicketServiceInstance);
*/

const WSAAController = require('../../controllers/WSAAController');
const WSCDCController = require('../../controllers/WSCDCController');


const routes = function(app) {

    app.post('/api/qr/validate', WSAAController.validate, function(req, res) {
        //console.log('post: /api/qr/validate');
        let URL = req.body.url;
        let startURL = process.env.AFIP_URL_START;

        if (URL.startsWith(startURL)) {
            URL = URL.replace(startURL, '');
            let buff = Buffer.from(URL, 'base64');

            try {
                if (buff.toString('utf-8')) {
                    let jsonData;
                    try {
                        jsonData = JSON.parse(buff.toString('utf-8'));
                    } catch (e) {
                        let msgErr = 'La URL no se encuentra codificada correctamente. Verificar el JSON generado.' +
                            '\r\nEj: puede haber algun campo enviado que no tenga un valor asociado.\r\nEl JSON debe inciar y terminar con {}.';
                        let jsonString = buff.toString('utf-8');
                        res.render('index', { message: { data: { json_string: jsonString } }, errors: { message: msgErr } });
                        return;
                    }

                    (async() => {
                        //Se obtiene el token y sign validos
                        let token = await WSAAController.getTokenAndSign();
                        //console.log('token', token);

                        let WSCDC = {
                            base64_url_data: URL,
                            json_url_data: JSON.stringify(jsonData)
                        };

                        //Se guardan los datos de la URL en mongo.wscdc
                        let WSCDCNew = await WSCDCController.create(WSCDC);

                        //Una vez guardados se hace el request al servicio de Constatacion de AFIP
                        await WSCDCController.wscdcSoap(token, WSCDCNew);
                        //console.log('WSCDCNew', WSCDCNew);
                        res.render('index', { message: { data: WSCDCNew }, errors: {} });
                    })();
                } else {
                    res.render('index', { message: {}, errors: { message: 'Verificar URL. No se pudieron obtener los valores.' } });
                }

            } catch (e) {
                res.render('index', { message: {}, errors: { message: e } });
            }
        } else {
            let msgError = `Verificar URL. Debe comenzar con: ${startURL}`;
            res.render('index', { message: {}, errors: { message: msgError } });
        };

    });

};

module.exports = routes;