const soap = require('soap');
const xml2js = require('xml2js');

let soapReqLogin = async function(ticket) {
    //console.log('soapReqLoginCms');

    let TA_WSAA = {};
    // SOAP Client 
    const soapClientOptions = { disableCache: true, endpoint: process.env.AFIP_WSAA_URI };
    //console.log('soapClientOptions:', soapClientOptions);

    // Create SOAP client
    const soapClient = await soap.createClientAsync(process.env.AFIP_WSAA_WSDL, soapClientOptions);
    //console.log('soapClient:', soapClient);

    // Parameters for soap client request 
    const loginArguments = { in0: ticket.cms };
    //console.log('loginArguments:', loginArguments);

    // Call loginCms SOAP method
    const [loginCmsResult] = await soapClient.loginCmsAsync(loginArguments);
    //console.log('loginCmsResult:', loginCmsResult);


    // Parse loginCmsReturn 
    await new Promise((resolve, reject) => {
        xml2js.Parser().parseString(loginCmsResult.loginCmsReturn, function(err, result) {
            if (err) {
                TA_WSAA = {};
                return reject(err);
            }

            const header = result.loginTicketResponse.header[0];
            const credentials = result.loginTicketResponse.credentials[0];
            const cuit = header.destination[0].match(/CUIT (\d{11})/i)[1];
            let generation_time = new Date(header.generationTime[0]);
            let expiration_time = new Date(header.expirationTime[0]);
            generation_time.setHours(generation_time.getHours() - 3);
            expiration_time.setHours(expiration_time.getHours() - 3);

            TA_WSAA = {
                unique_id: header.uniqueId[0],
                generation_time: generation_time.toISOString(),
                expiration_time: expiration_time.toISOString(),
                token: credentials.token[0],
                sign: credentials.sign[0],
                cms: ticket.cms,
                active: true
            };

            resolve();
        });
    });
    //console.log('TA_WSAA', TA_WSAA);
    return TA_WSAA;
};

let soapWSCDC = async function(token, wscdc) {
    //console.log('soapWSCDC');

    // SOAP Client 
    const soapClientOptions = { disableCache: true, endpoint: process.env.AFIP_WSCDC_URI };
    //console.log('soapClientOptions:', soapClientOptions);

    // Create SOAP client
    const soapClient = await soap.createClientAsync(process.env.AFIP_WSCDC_WSDL, soapClientOptions);
    //console.log('soapClient:', soapClient);

    // Parameters for soap client request 
    let jsonComp = JSON.parse(wscdc.json_url_data.toString('utf-8'));
    //console.log('jsonComp', jsonComp);
    let cbteModo = '';
    if (jsonComp.tipoCodAut === 'E') cbteModo = 'CAE';
    if (jsonComp.tipoCodAut === 'A') cbteModo = 'CAEA';

    //Obligatorios
    let CmpReq = {
        CbteModo: cbteModo,
        CuitEmisor: jsonComp.cuit,
        PtoVta: jsonComp.ptoVta,
        CbteTipo: jsonComp.tipoCmp,
        CbteNro: jsonComp.nroCmp,
        CbteFch: jsonComp.fecha.replace(/-/g, ""),
        ImpTotal: jsonComp.importe,
        CodAutorizacion: jsonComp.codAut
    };
    //Opcionales, se envian si fueron detallados
    if (jsonComp.tipoDocRec) CmpReq.DocTipoReceptor = jsonComp.tipoDocRec;
    if (jsonComp.nroDocRec) CmpReq.DocNroReceptor = jsonComp.nroDocRec;

    const ConstatarArguments = {
        Auth: {
            Token: token.token,
            Sign: token.sign,
            Cuit: process.env.CUIT
        },
        CmpReq: CmpReq
    };
    //console.log('ConstatarArguments:', ConstatarArguments);

    // Call loginCms SOAP method
    const [ComprobanteConstatar] = await soapClient.ComprobanteConstatarAsync(ConstatarArguments); //loginArguments
    //console.log('ComprobanteConstatar:', ComprobanteConstatar.ComprobanteConstatarResult); //.ComprobanteConstatarResult.Errors

    //Se obtiene la respuesta
    wscdc.resp_result = ComprobanteConstatar.ComprobanteConstatarResult.Resultado;
    wscdc.resp_process_date = ComprobanteConstatar.ComprobanteConstatarResult.FchProceso;

    //Obtengo las observaciones
    if (ComprobanteConstatar.ComprobanteConstatarResult.Observaciones) {
        wscdc.resp_observations = JSON.stringify(ComprobanteConstatar.ComprobanteConstatarResult.Observaciones.Obs[0]);
    }
    //Obtengo los errores
    if (ComprobanteConstatar.ComprobanteConstatarResult.Errors) {
        wscdc.resp_errors = JSON.stringify(ComprobanteConstatar.ComprobanteConstatarResult.Errors.Err[0]);
    }


    //console.log('result wscdc', wscdc);

    return;
};

module.exports = { soapReqLogin, soapWSCDC };