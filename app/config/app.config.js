const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');
const cloudinary = require('cloudinary');
const config = require('../../config');

const attachTo = (app) => {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( { extended: true } ));

    app.use(cookieParser('keyboard cat'));
    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
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
                cb(null, Date.now() + '.jpg');
            },
        }),
    }).single('imageupload'));

    cloudinary.config({
        cloud_name: 'ht9b0fahu',
        api_key: '991577582747119',
        api_secret: 'CfnE5syCQwYwtgudCtZHr8hAi6E',
    });

    app.locals.moment = require('moment');
    app.locals.cloudinary = cloudinary;
};

module.exports = { attachTo };
