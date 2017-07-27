/* globals __dirname */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helpers = require('./helpers');
const multer = require('multer');

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
    app.use(multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './public/uploads');
            },
            filename: (req, file, cb) => {
                const filename = file.originalname.split('.');
                cb(null, Date.now() + '.' + filename[filename.length - 1]);
            },
        }),
    }).single('imageupload'));
    app.locals.moment = require('moment');

    require('./auth').init(app, data.users);

    const controllers = require('./controllers')(data, helpers);
    require('./routers').attachTo(app, controllers);

    return Promise.resolve({ server: app, data: data });
};

module.exports = { init };
