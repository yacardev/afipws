const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const Schema = mongoose.Schema;

const TimeModel = mongoose.model("Times", {
    hourfrom: {
        type: String,
        required: [true, 'Hora desde es requerido']
    },
    hourto: {
        type: String,
        required: [true, 'Hora hasta es requerido']
    }
});

/*
const timeSchema = new Schema({
    hourfrom: {
        number: String,
        required: [true, 'It is required']
    },
    hourto: {
        number: String,
        required: [true, 'It is required']
    },
});
TimeModel.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
*/



module.exports = TimeModel;
//module.exports = mongoose.model('Time', timeSchema);