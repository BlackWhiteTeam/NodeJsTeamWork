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

    app.get('/createPost', (req, res) => {
        return res.render('posts/createPost');
    });

    app.post('/createPost',
        uploadPictureController.upload.single('imageupload'), (req, res) => {
        const photo = req.file;
        uploadPictureController.uploadPicture(photo);
        const post = {
            author: req.user._id,
            picture: photo.filename,
            description: req.body.description,
        };

        console.log(post);

        data.posts.create(post)
            .then((dbPost) => {
                return res.redirect('/users/' + post.author._id);
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/');
            });
    });
};

module.exports = { attachTo };
