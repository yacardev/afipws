const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const saltRounds = 10;
const validateEmail = function(email) {
    const re = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
};


const UserModel = mongoose.model("Users", {
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El mail es obligatorio'],
        lowercase: true,
        unique: true,
        //validate: [validateEmail, 'Email invalido'],
        match: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/
    },
    password: {
        type: String,
        required: [true, 'Password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    },
    googleId: String,
    facebookId: String
});

//UserModel.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario.' });


module.exports = UserModel;