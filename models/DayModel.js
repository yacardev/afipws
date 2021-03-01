const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const DayModel = mongoose.model('Day', {
    datename: {
        type: String,
        unique: true,
        required: [true, 'It is required']
    }
});


/*
var daySchema = new Schema({
    datename: {
        type: String,
        unique: true,
        required: [true, 'It is required']
    }
});

module.exports = mongoose.model('Day', daySchema);*/

daySchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
module.exports = DayModel;