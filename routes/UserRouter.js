const UserController = require('../controllers/UserController');
const UserService = require('../services/UserService');
const UserModel = require('../models/UserModel');

const UserServiceInstance = new UserService(UserModel);
const UserControllerInstance = new UserController(UserServiceInstance);
const path = "/api/users";

const routes = function(app) {
    app.get(`${path}/`, function(req, res) {
        UserControllerInstance.getAll(req, res);
    });

    app.get(`${path}/findone`, function(req, res) {
        UserControllerInstance.getById(req, res);
    });

    app.post(`${path}/create`, function(req, res) {
        UserControllerInstance.create(req, res);
    });
};

module.exports = routes;