const TimeController = require('../controllers/TimeController');
const TimeService = require('../services/TimeService');
const TimeModel = require('../models/TimeModel');

const TimeServiceInstance = new TimeService(TimeModel);
const TimeControllerInstance = new TimeController(TimeServiceInstance);
const path = "/api/times";

const routes = function(app) {
    app.get(`${path}/`, function(req, res) {
        TimeControllerInstance.getAll(req, res);
    });

    app.get(`${path}/findone`, function(req, res) {
        TimeControllerInstance.getById(req, res);
    });

    app.post(`${path}/create`, function(req, res) {
        TimeControllerInstance.create(req, res);
    });
};

module.exports = routes;