const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ClassModel = mongoose.model('Classs', {
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        unique: true
    },
    creation_date: {
        type: Date,
        required: [true, 'Fecha creacion obligatorio'],
        default: Date.now
    }
});

/*
var classesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        unique: true
    },
    creation_date: {
        type: Date,
        required: [true, 'Fecha creacion obligatorio'],
        default: Date.now
    }
})
classesSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
*/



module.exports = ClassModel;
//module.exports = mongoose.model('Classes', classesSchema);