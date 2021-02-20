const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const Schema = mongoose.Schema;

const TimeModel = mongoose.model('Times', {
    hourfrom: {
        number: String,
        required: [true, 'It is required']
    },
    hourto: {
        number: String,
        required: [true, 'It is required']
    },
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
});*/

timeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

module.exports = TimeModel;
//module.exports = mongoose.model('Time', timeSchema);