const passport = require('passport');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.split('.');
        cb(null, Date.now() + '.' + filename[filename.length - 1]);
    },
});
const upload = multer({ storage: storage });

const Jimp = require('jimp');
const makePictureBlack = (photo, path) => {
    Jimp.read(path)
        .then((img) => {
            img.greyscale().write(path);
        })
        .catch((err) => {
            console.error(err);
        });
};

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
        // validate
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            stringProfilePicture: 'defaultpic.jpg',
        };

        data.users.create(user)
            .then((dbUser) => {
                req.login(user, (err) => {
                    if (err) {
                        req.flash('error', req);
                    }
                    return res.redirect('/users/' + dbUser.id);
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
                    res.redirect('/users/' + user._id);
                });
        }
    );

    app.get('/users/:id', (req, res) => {
        if (req.user) {
            const id = getIdByUrl(req.url);
            data.users.getById(id)
                .then((user) => {
                    res.render('users/profile', {
                        context: user,
                        currentUserId: req.user._id.toString(),
                    });
                });
        } else {
            res.redirect('/login');
        }
    });

    app.post('/users/:id', upload.single('imageupload'), (req, res) => {
        const id = getIdByUrl(req.url);
        data.users.getByObjectName(req.user.name)
            .then((user) => {
                const currentUserId = user._id.toString();
                if (id === currentUserId) {
                    const photo = req.file;
                    const pathToSave = './public/uploads/' + photo.filename;
                    makePictureBlack(photo, pathToSave);
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
};

module.exports = { attachTo };
