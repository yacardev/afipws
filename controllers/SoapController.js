const soap = require('soap');
const xml2js = require('xml2js');

let soapReqLogin = async function(ticket) {
    console.log('soapReqLoginCms');

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


module.exports = { soapReqLogin };