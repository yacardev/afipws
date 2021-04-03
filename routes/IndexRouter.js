const routes = function(app) {
    app.get('/', function(req, res) {
        res.render('index', { message: {}, errors: {} });
    });
};

module.exports = routes;