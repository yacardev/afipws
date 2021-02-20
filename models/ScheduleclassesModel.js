const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ScheduleClassModule = mongoose.model('ScheduleClass', {
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'It is required']
    },
    class: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Class',
            required: [true, 'It is required']
    },
    day: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Day',
        required: [true, 'It is required']
    },
    time: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Time',
        required: [true, 'It is required']
    },
    enabledquantity: {
        type: Number,
        required: [true, 'It is required']
    }
});

/*var scheduleClassSchema = new Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'It is required']
    },
    class: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Class',
            required: [true, 'It is required']
    },
    day: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Day',
        required: [true, 'It is required']
    },
    time: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Time',
        required: [true, 'It is required']
    },
    enabledquantity: {
        type: Number,
        required: [true, 'It is required']
    },
});

module.exports = mongoose.model('scheduleClass', scheduleClassSchema);*/

module.exports = ScheduleClassModule;