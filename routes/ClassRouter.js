const ClassModel = require('../models/ClassModel');
const ClassService = require('../services/ClassService');
const ClassController = require('../controllers/ClassController');

const ClassServiceInstance = new ClassService(ClassModel);
const ClassControllerInstance = new ClassController(ClassServiceInstance);

const path = "/api/classes";

const routes = function(app) {
    app.get(`${path}/`, function(req, res) {
        ClassControllerInstance.getAll(req, res);
    });

    app.get(`${path}/findone`, function(req, res) {
        ClassControllerInstance.getById(req, res);
    });

    app.post(`${path}/create`, function(req, res) {
        ClassControllerInstance.create(req, res);
    });
};

module.exports = routes;