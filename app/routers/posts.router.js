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
        return res.render('posts/createPost');
    });

    app.get('/addToFavourites/:id', (req, res, next) => {
        const urlParts = req.url.split('/');
        const idPost = urlParts[urlParts.length - 1];
        const idUser = (req.user._id);
        data.users.addToFavorites(idUser, idPost);
        return res.redirect('/myfavorites');
        // Гизи заеби го тва, то май се прави с Ajax forms! :D
    });

    app.get('/myfavorites', (req, res) => {
        return data.posts.getMyFavoritesPosts(req.user.favorites)
            .then((posts) => {
                return res.render('posts/gallery', {
                    context: posts.reverse(),
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
