const passport = require('passport');

const usersController = (data, helpers) => {
    return {
        renderAllUsers(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res.render('users/all', {
                        context: users,
                    });
                });
        },
        renderRegisterPage(req, res) {
            return res.render('users/register');
        },
        registerUser(req, res) {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                stringProfilePicture: 'defaultpic.png',
                favorites: [],
            };

            data.users.create(user)
                .then((dbUser) => {
                    req.login(user, (err) => {
                        if (err) {
                            req.flash('error', req);
                        }
                        req.flash('success', 'You are registered!');
                        return res.redirect('/users/' + dbUser._id);
                    });
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/register');
                });
        },
        renderLoginPage(req, res) {
            if (req.user) {
                return res.redirect('/users/' + req.user._id);
            }
            return res.render('users/login');
        },
        loginUser(req, res, next) {
            return passport.authenticate('local', (err, user) => {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/login');
                }
                req.login(user, (error) => {
                    if (error) {
                        req.flash(error);
                        return res.redirect('/login');
                    }
                    req.flash('success', 'You are logged in!');
                    return res.redirect('/users/' + user._id);
                });
                return next();
            })(req, res, next);
        },
        getProfilePage(req, res) {
            if (req.user) {
                const id = helpers.getIdByUrl(req.url);
                data.users.getById(id)
                    .then((user) => {
                        data.posts.getPostsByUsername(user.name)
                            .then((posts) => {
                                res.render('users/profile', {
                                    context: user,
                                    posts: posts,
                                    currentUserId: req.user._id.toString(),
                                });
                            });
                    });
            } else {
                res.redirect('/login');
            }
        },
        updateProfilePicture(req, res) {
            const id = helpers.getIdByUrl(req.url);
            data.users.getByObjectName(req.user.name)
                .then((user) => {
                    const currentUserId = user._id.toString();
                    if (id === currentUserId) {
                        const photo = req.file;
                        helpers.uploadPicture(photo);
                        data.users.updateProfilePicture(id, photo);

                        req.flash('info', 'File upload successfully.');
                    } else {
                        req.flash('error', 'It is not your profile');
                    }
                });

            return res.redirect('/users/' + id);
        },

        searchUser(req, res) {
            const canSeeProfiles = !!(req.user);
            const input = req.body.searchedUser;
            data.users.getAllUsersByMatchingString(input)
                .then((users) => {
                    return res.render('users/all', {
                        context: users,
                        lastInput: input,
                        canSeeProfiles: canSeeProfiles,
                    });
                });
        },

        userLogout(req, res) {
            req.logout();
            res.redirect('/');
        },
    };
};

module.exports = usersController;
