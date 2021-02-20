require('dotenv').config();
var mongoose = require('mongoose');
var mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // estamos conectados!
    console.log('DB ONLINE');
});