const uploadPictureController =
    require('../controllers/uploadPicture.controller');


const attachTo = (app, data) => {
    app.get('/gallery', (req, res) => {
        return data.posts.getAll()
            .then((posts) => {
                return res.render('posts/gallery', {
                    context: posts,
                });
            });
    });

    app.get('/myphotos', (req, res) => {
        return data.posts.getPostsByUsername(req.user.name)
            .then((posts) => {
                return res.render('posts/gallery', {
                    context: posts,
                });
            });
    });

    app.get('/createPost', (req, res) => {
        return res.render('posts/createPost');
    });

    app.get('/addToFavourites/:id', (req, res) => {
        const urlParts = req.url.split('/');
        const idPost = urlParts[urlParts.length - 1];
        console.log(idPost);
        const idUser = (req.user._id);
        return data.users.addToFavorites(idUser, idPost);
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
                return res.redirect('/users/' + req.user._id);
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/');
            });
    });
};

module.exports = { attachTo };
