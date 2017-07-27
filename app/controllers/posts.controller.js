// think how to make local variable or not reloading page
let lastPicture = 'upload-icon.png';

const postsController = (data, helpers) => {
    return {
        renderAllPosts(req, res) {
            return data.posts.getAll()
                .then((posts) => {
                    return res.render('posts/gallery', {
                        context: posts.reverse(),
                    });
                });
        },
        renderPostsOfUser(req, res) {
            return data.posts.getPostsByUsername(req.user.name)
                .then((posts) => {
                    return res.render('posts/gallery', {
                        context: posts.reverse(),
                    });
                });
        },
        renderCreatePost(req, res) {
            if (req.user) {
                return res.render('posts/createPost', {
                    image: lastPicture,
                });
            }
            return res.redirect('/login');
        },
        renderUserFavourites(req, res) {
            return data.posts.getMyFavoritesPosts(req.user.favorites)
                .then((posts) => {
                    return res.render('posts/gallery', {
                        context: posts.reverse(),
                        isDelete: true,
                    });
                });
        },
        createPost(req, res) {
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
        },
        showPicture(req, res) {
            const photo = req.file;
            helpers.uploadPicture(photo);
            lastPicture = photo.filename;
            return res.redirect('/createPost');
        },
    };
};

module.exports = postsController;