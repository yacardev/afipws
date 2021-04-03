/*
const TicketModel = require('../../models/TicketModel');
const TicketService = require('../../services/TicketService');
const WSAAController = require('../../controllers/WSAAController');

const TicketServiceInstance = new TicketService(TicketModel);
const WSAAControllerInstance = new WSAAController(TicketServiceInstance);
*/

const WSAAController = require('../../controllers/WSAAController');


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
                WSAAController.getTokenAndSign(req, res);
            } catch (e) {
                res.render('index', { message: {}, errors: { message: 'Verificar URL. No se pudieron obtener los valores.' } });
            }
        } else {
            let msgError = `Verificar URL. Debe comenzar con: ${startURL}`;
            res.render('index', { message: {}, errors: { message: msgError } });
        };

    });

};
module.exports = routes;