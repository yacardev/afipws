const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const LocationModel = mongoose.model('Location', {
    name: {
        type: String,
        unique: true,
        required: [true, 'It is required']
    },
    address1: {
        type: String,
        required: [true, 'It is required']
    },
    addressnum: {
        type: String,
        required: [true, 'It is required']
    }
});

/*var locationSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'It is required']
    },
    address1: {
        type: String,
        required: [true, 'It is required']
    },
    addressnum: {
        type: String,
        required: [true, 'It is required']
    },
});

module.exports = mongoose.model('Location', locationSchema);*/

locationSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

module.exports = LocationModel;