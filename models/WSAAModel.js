const mongoose = require('mongoose');

const WSAAModel = mongoose.model('WSAA_TAS', {
    unique_id: {
        type: Number,
        required: [true, 'Unique ID obligatorio'],
        trim: true,
        unique: true
    },
    generation_time: {
        type: Date,
        required: [true, 'Fecha Generacion obligatorio']
    },
    expiration_time: {
        type: Date,
        required: [true, 'Fecha Expiracion obligatorio']
    },
    active: {
        type: Boolean,
        required: [true, 'Activo true/false obligatorio']
    },
    creation_date: {
        type: Date,
        required: [true, 'Fecha de Creacion obligatorio'],
        default: getDate()
    },
    cms: { type: String },
    token: { type: String },
    sign: { type: String }
});

function getDate() {
    let creation_date = new Date();
    creation_date.setHours(creation_date.getHours() - 3);
    return creation_date.toISOString();
}
module.exports = WSAAModel;