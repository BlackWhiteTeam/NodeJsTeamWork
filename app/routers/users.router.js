const passport = require('passport');

const attachTo = (app, data) => {
    app.get('/users', (req, res) => {
        return data.users.getAll()
            .then((users) => {
                return res.render('users/all', {
                    context: users,
                });
            });
    });

    app.get('/register', (req, res) => {
        return res.render('users/register');
    });

    app.post('/register', (req, res) => {
        const user = req.body;


        data.users.create(user)
            .then((dbUser) => {
                return res.redirect('/users/' + dbUser.id);
            })
            .catch((err) => {
                return res.redirect('/register');
            });
    });

    app.get('/login', (req, res) => {
        return res.render('users/login');
    });

    app.post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash: false,
        })
    );

    app.get('/users/:id', (req, res) => {
        const urlParts = req.url.split('/');
        const id = urlParts[urlParts.length - 1];
        data.users.getById(id)
            .then((user) => {
                res.render('users/profile', {
                    context: user,
                });
            });
    });
};

module.exports = { attachTo };
