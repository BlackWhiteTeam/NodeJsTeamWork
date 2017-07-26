/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, controller) => {
    app.get('*', (req, res, next) => {
        res.locals.loggedIn = !!(req.user);
        res.locals.user = req.user;
        next();
    });

    app.get('/', (req, res) => {
        return res.render('home');
    });

    app.get('/about', (req, res) => {
        return res.render('about');
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, controller);
        });
};

module.exports = { attachTo };
