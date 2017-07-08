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

        // validate user

        data.users.create(user)
            .then((dbUser) => {
                return res.redirect('/users/' + dbUser.id);
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/register');
            });
    });
};

module.exports = { attachTo };
