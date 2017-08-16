// think how to make local variable or not reloading page
let lastPicture = { secure_url: 'https://res.cloudinary.com/ht9b0fahu/image/upload/v1502849844/upload-icon.png' };

const postsController = (data, helpers) => {
    return {
        renderAllPosts(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            return data.posts.getAll()
                .then((posts) => {
                    helpers.getLikedAndDisliked(posts, req);
                    helpers.getFavourites(posts, req);
                    return res.render('posts/gallery', {
                        context: posts.reverse(),
                    });
                });
        },
        renderPostsOfUser(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            return data.posts.getPostsByUsername(req.user.name)
                .then((posts) => {
                    helpers.getLikedAndDisliked(posts, req);
                    helpers.getFavourites(posts, req);
                    return res.render('posts/gallery', {
                        context: posts.reverse(),
                        isMyPhotos: true,
                    });
                });
        },
        renderCreatePost(req, res) {
            if (req.user) {
                return res.render('posts/createPost', {
                    image: lastPicture.secure_url,
                });
            }
            return res.redirect('/login');
        },
        renderUserFavourites(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const posts = req.user.favourites;
            helpers.getFavourites(posts, req);

            return res.render('posts/gallery', {
                context: posts.reverse(),
                isMyFavourites: true,
            });
        },
        createPost(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            if (lastPicture.public_id === 'upload-icon') {
                req.flash('err', 'Cannot post empty picture!');
                return res.redirect('/createPost');
            }
            const post = {
                author: req.user,
                picture: lastPicture.secure_url,
                time: lastPicture.original_filename,
                description: req.body.description.toString(),
                likes: 0,
                dislikes: 0,
            };
            lastPicture = { secure_url: 'https://res.cloudinary.com/ht9b0fahu/image/upload/v1502849844/upload-icon.png' };
            return data.posts.create(post)
                .then(() => {
                    req.flash('success', 'Your upload is successful!');
                    return res.redirect('/myphotos');
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/');
                });
        },
        showPicture(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const photo = req.file;

            return helpers.uploadPicture(photo)
                .then((photoData) => {
                    lastPicture = photoData;
                    return res.redirect('/createPost');
                });
        },
        deletePost(req, res) {
            if (!req.user) {
                req.status().send('You are not authenticated');
            }
            const postId = req.body.postId;
            return data.posts.getById(postId)
                .then((post) => {
                    if (post.author.name === req.user.name) {
                        return data.posts.removePost(postId)
                            .then(() => {
                                return res.status(200).send({});
                            });
                    }
                    return res.status(400).send('It is not your post!');
                }).catch((err) => {
                    return res.status(400).send(err);
                });
        },
    };
};

module.exports = postsController;
