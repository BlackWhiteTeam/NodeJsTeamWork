const { Router } = require('express');

const createUsersController = require('../MVC/Controllers/user');

module.exports = (app, data) => {
    const router = new Router();
    const usersController = createUsersController(data);

    router
        .get('/', usersController.getHome)
        .get('/home', usersController.getHome)
        .get('/login', usersController.getLogin)
        .get('/register', usersController.getRegister);
    app.use(router);
};
