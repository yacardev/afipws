require('dotenv').config();
require('./config/db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000;

const app = express();

const qrRouter = require('./routes/api/QrRouter');
const indexRouter = require('./routes/IndexRouter');





app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'afipWS!!!!QASFERWQR____134448',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, pageResp: 'ppp' }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

indexRouter(app);
qrRouter(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//module.exports = app;