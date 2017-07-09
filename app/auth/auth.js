const passport = require('passport');
const { Strategy } = require('passport-local').Strategy;

const init = (app) => {
    passport.use(new Strategy(
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.',
                    });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.',
                    });
                }
                return done(null, user);
            });
        }
    ));
};

module.exports = {
    init,
};
