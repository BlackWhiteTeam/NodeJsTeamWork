const passport = require('passport');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.split('.');
        cb(null, file.fieldname + '-' + Date.now() +
            '.' + filename[filename.length - 1]);
    },
});

const upload = multer({ storage: storage });

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
                req.flash('error', err);
                return res.redirect('/register');
            });
    });

    app.get('/login', (req, res) => {
        return res.render('users/login');
    });

    app.post('/login', passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
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

    app.post('/users/:id', upload.single('imageupload'), (req, res) => {
        req.flash('info', 'File upload successfully.');
        return res.redirect('/');
    });
};

module.exports = { attachTo };
