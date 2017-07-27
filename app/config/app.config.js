const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const attachTo = (app) => {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( { extended: true } ));

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
};

module.exports = { attachTo };
