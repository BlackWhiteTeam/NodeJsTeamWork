const passport = require('passport');
const uploadPictureController =
    require('../controllers/uploadPicture.controller');

const getIdByUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

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
    });

    app.get('/login', (req, res) => {
        if (req.user) {
            return res.redirect('/users/' + req.user._id);
        }
        return res.render('users/login');
    });

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true,
        }),
        (req, res) => {
            data.users.getByObjectName(req.body.username)
                .then((user) => {
                    req.flash('success', 'You are logged in!');
                    res.redirect('/users/' + user._id);
                });
        }
    );

    app.get('/users/:id', (req, res) => {
        if (req.user) {
            const id = getIdByUrl(req.url);
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
    });

    // eslint-disable-next-line
    app.post('/users/:id', uploadPictureController.upload.single('imageupload'), (req, res) => {
        const id = getIdByUrl(req.url);
        data.users.getByObjectName(req.user.name)
            .then((user) => {
                const currentUserId = user._id.toString();
                if (id === currentUserId) {
                    const photo = req.file;
                    uploadPictureController.uploadPicture(photo);
                    data.users.updateProfilePicture(id, photo);

                    req.flash('info', 'File upload successfully.');
                } else {
                    req.flash('error', 'It is not your profile');
                }
            });

        return res.redirect('/users/' + id);
    });

    app.post('/users', (req, res) => {
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
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/addToFavorites/:id', (req, res) => {
        const idPost = getIdByUrl(req.url);
        const idUser = (req.user._id);
        data.users.addToFavorites(idUser, idPost);
        return res.redirect('/myfavorites');
    });

    app.get('/deleteFromFavorites/:id', (req, res) => {
        const idPost = getIdByUrl(req.url);
        const idUser = (req.user._id);
        data.users.deleteFromFavorites(idUser, idPost);
        return res.redirect('/myfavorites');
    });
};

module.exports = { attachTo };
