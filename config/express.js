const express = require('express');
const glob = require('glob');

module.exports = function(app, config) {
    const env = 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env === 'development';

    app.set('views', config.root + '/app/MVC/views');
    app.set('view engine', 'pug');

    app.use(express.static(config.root + '/public'));
    app.use('/libs', express.static(config.root + '/node_modules'));

    const controllers = glob.sync(config.root + '/app/Controllers/*.js');
    controllers.forEach(
        function(controller) {
            require(controller)(app);
    });

    const routes = glob.sync(config.root + '/app/routes/*.js');
    routes.forEach(function(route) {
        require(route)(app);
    });

    app.use(
        function(req, res, next) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
    });

    if (app.get('env') === 'development') {
        app.use(
            function(err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err,
                    title: 'error',
                });
        });
    }

    app.use(
        function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {},
                title: 'error',
            });
    });

    return app;
};
