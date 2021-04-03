const mongoose = require('mongoose');

const WSAAModel = mongoose.model('WSAA_TA', {
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
    cms: { type: String },
    token: { type: String },
    sign: { type: String }
});


module.exports = WSAAModel;