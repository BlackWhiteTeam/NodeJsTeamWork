const uploadPictureController =
    require('../controllers/uploadPicture.controller');


const attachTo = (app, data) => {
    app.get('/gallery', (req, res) => {
        return data.posts.getAll()
            .then((posts) => {
                return res.render('posts/gallery', {
                    context: posts.reverse(),
                });
            });
    });

    app.get('/myphotos', (req, res) => {
        return data.posts.getPostsByUsername(req.user.name)
            .then((posts) => {
                return res.render('posts/gallery', {
                    context: posts.reverse(),
                });
            });
    });

    app.get('/createPost', (req, res) => {
        if (req.user) {
            return res.render('posts/createPost');
        }
        return res.redirect('/login');
    });

    app.get('/myfavorites', (req, res) => {
        return data.posts.getMyFavoritesPosts(req.user.favorites)
            .then((posts) => {
                return res.render('posts/gallery', {
                    context: posts.reverse(),
                    isDelete: true,
                });
            });
    });

    app.post('/createPost',
        uploadPictureController.upload.single('imageupload'), (req, res) => {
        const photo = req.file;
        uploadPictureController.uploadPicture(photo);

        const post = {
            author: req.user.name,
            picture: photo.filename,
            description: req.body.description,
        };

        data.posts.create(post)
            .then((dbPost) => {
                return res.redirect('/myphotos');
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/');
            });
    });
};

module.exports = { attachTo };
