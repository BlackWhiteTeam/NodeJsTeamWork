const uploadPictureController =
    require('../helpers/uploadPicture.helper');
let lastPicture = 'upload-icon.png';

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
            return res.render('posts/createPost', {
                image: lastPicture,
            });
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

    app.post('/createPost', (req, res) => {
        console.log(req.body);
        const post = {
            author: req.user.name,
            picture: lastPicture,
            description: req.body.description,
        };
        lastPicture = 'upload-icon.png';
        data.posts.create(post)
            .then((dbPost) => {
                return res.redirect('/myphotos');
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/');
            });
    });

    app.post('/showPicture',
        uploadPictureController.upload.single('imageupload'), (req, res) => {
            const photo = req.file;
            uploadPictureController.uploadPicture(photo);
            lastPicture = photo.filename;
            return res.redirect('/createPost');
        });
};

module.exports = { attachTo };