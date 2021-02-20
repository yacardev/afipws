require('dotenv').config();
require('./config/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const usersRouter = require('./routes/UserRoute');

app.use(bodyParser.json());
usersRouter(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});