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
                let jsonData = JSON.parse(buff.toString('utf-8'));
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

            } catch (e) {
                res.render('index', { message: {}, errors: { message: e } }); //'Verificar URL. No se pudieron obtener los valores.'
            }
        } else {
            let msgError = `Verificar URL. Debe comenzar con: ${startURL}`;
            res.render('index', { message: {}, errors: { message: msgError } });
        };

    });

};

module.exports = routes;