const mongoose = require('mongoose');

const WS_WSCDC = mongoose.model('WS_WSCDCS', {
    base64_url_data: {
        type: String,
        required: [true, 'URL en base64 es obligatorio.']
    },
    json_url_data: {
        type: String,
        required: [true, 'JSON de la URL es obligatorio.']
    },
    resp_result: { type: String },
    resp_observations: { type: String },
    resp_errors: { type: String },
    resp_process_date: { type: String },
    req_error: { type: String },
    creation_date: {
        type: Date,
        default: getDate(),
        required: [true, 'Fecha de Creacion obligatorio']
    }
});

function getDate() {
    let creation_date = new Date();
    creation_date.setHours(creation_date.getHours() - 3);
    return creation_date.toISOString();
}


module.exports = WS_WSCDC;