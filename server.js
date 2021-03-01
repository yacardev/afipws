require('dotenv').config();
require('./config/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const usersRouter = require('./routes/UserRouter');
const timesRouter = require('./routes/TimeRouter');
const classRouter = require('./routes/ClassRouter');

app.use(bodyParser.json());
usersRouter(app);
timesRouter(app);
classRouter(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});