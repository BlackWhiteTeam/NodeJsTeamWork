/* globals __dirname */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const init = (data) => {
    const app = express();

    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( { extended: true } ));

    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));
    app.use(express.static(path.join(__dirname, '../public/')));

    app.use(cookieParser('keyboard cat'));
    app.use(session({
        saveUninitialized: true,
        resave: false,
        secret: 'secret',
        maxAge: 60000,
    }));

    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    require('./auth')
        .init(app, data.users);

    require('./controllers')
        .attachTo(data);

    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
