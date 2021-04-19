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
                            '\r\nEj: puede haber algun campo enviado que no tenga un valor asociado.\r\nEl JSON debe inciar y terminar con {} y debe coincidir con las especificaciones de AFIP.';
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
                        let createErr;
                        [createErr, WSCDC] = await WSCDCController.create(false, WSCDC);
                        if (createErr) {
                            res.render('index', { message: { data: { json_string: WSCDC.json_url_data } }, errors: { message: createErr } });
                            return;
                        }
                        //console.log('WSCDCController.create', WSCDC);

                        //Una vez guardados se hace el request al servicio de Constatacion de AFIP
                        [soapErr, token, WSCDC] = await WSCDCController.wscdcSoap(false, token, WSCDC);
                        //console.log('WSCDCController.wscdcSoap', WSCDC);
                        if (soapErr) {
                            res.render('index', { message: { data: WSCDC }, errors: { message: soapErr } });
                            return;
                        }

                        res.render('index', { message: { data: WSCDC }, errors: {} });
                    })();
                } else {
                    res.render('index', { message: {}, errors: { message: 'Verificar URL. No se pudieron obtener los valores. Debe coincidir con las especificaciones de AFIP.' } });
                }

            } catch (e) {
                console.log('err qr router', e);
                res.render('index', { message: {}, errors: { message: e } });
            }
        } else {
            let msgError = `Verificar URL. Debe comenzar con: ${startURL}`;
            res.render('index', { message: {}, errors: { message: msgError } });
        };

    });

};

module.exports = routes;