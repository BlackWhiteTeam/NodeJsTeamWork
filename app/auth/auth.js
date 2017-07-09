const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const init = (app, usersData) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return usersData.getByObjectName(username)
                .then((user) => {
                    console.log('It works');
                    return done(null, user);
                })
                .catch((err) => {
                    console.log('Works');
                    return done(err);
                });
        }
    ));

    app.use(cookieParser());
    app.use(session(
        {
            secret: 'secret',
            saveUninitialized: true,
            resave: true,
        }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        return usersData.getById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = {
    init,
};
