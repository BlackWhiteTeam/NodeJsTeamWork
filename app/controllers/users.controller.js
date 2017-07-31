const passport = require('passport');

const usersController = (data, helpers) => {
    return {
        renderAllUsers(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res.render('users/all', {
                        context: users,
                    });
                });
        },
        renderRegisterPage(req, res) {
            return res.render('users/register');
        },
        registerUser(req, res) {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                stringProfilePicture: 'defaultpic.png',
                favourites: [],
                liked: [],
                disliked: [],
            };

            return data.users.create(user)
                .then((dbUser) => {
                    req.login(dbUser, (err) => {
                        if (err) {
                            return Promise.reject(err);
                        }
                        req.flash('success', 'You are registered!');
                        return res.redirect('/users/' + dbUser._id);
                    });
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/register');
                });
        },
        renderLoginPage(req, res) {
            if (req.user) {
                return res.redirect('/users/' + req.user._id);
            }
            return res.render('users/login');
        },
        loginUser(req, res, next) {
            return passport.authenticate('local', (err, user) => {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/login');
                }
                req.login(user, (error) => {
                    if (error) {
                        req.flash(error);
                        return res.redirect('/login');
                    }
                    req.flash('success', 'You are logged in!');
                    return res.redirect('/users/' + user._id);
                });
                return next();
            })(req, res, next);
        },
        getProfilePage(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const id = req.params.id;
            return data.users.getById(id)
                .then((user) => {
                    return Promise.all(
                        [data.posts.getPostsByUsername(user.name), user]
                    );
                }).then(([posts, user]) => {
                    helpers.getLikedAndDisliked(posts, req);
                    helpers.getFavourites(posts, req);
                    return res.render('users/profile', {
                        context: user,
                        posts: posts,
                        currentUserId: req.user._id.toString(),
                    });
                });
        },
        updateProfilePicture(req, res) {
            const id = req.params.id;
            return data.users.getByObjectName(req.user.name)
                .then((user) => {
                    const currentUserId = user._id.toString();
                    if (id !== currentUserId) {
                        return Promise.reject('It is not your profile');
                    }
                    const photo = req.file;
                    helpers.uploadPicture(photo);
                    return data.users.updateProfilePicture(id, photo);
                })
                .then(() => {
                    req.flash('info', 'File upload successfully.');
                    return res.redirect('/users/' + id);
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/login');
                });
        },

        searchUser(req, res) {
            const canSeeProfiles = !!(req.user);
            const input = req.body.searchedUser;
            return data.users.getAllUsersByMatchingString(input)
                .then((users) => {
                    return res.render('users/all', {
                        context: users,
                        lastInput: input,
                        canSeeProfiles: canSeeProfiles,
                    });
                });
        },

        userLogout(req, res) {
            req.logout();
            req.flash('info', 'You are logged out!');
            return res.redirect('/');
        },

        likePost(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const postId = req.body.postId;
            return data.posts.getById(postId)
                .then((post) => {
                    return Promise.all([
                        data.users.checkIfPostIsRated(req.user.liked, post),
                        post,
                    ]);
                }).then(([liked, post]) => {
                    if (liked) {
                        return Promise.reject(
                            'You already liked this picture!');
                    }
                    return data.users.addToLiked(req.user._id, post);
                }).then(() => {
                    return data.posts.like(postId);
                }).then(() => {
                    return res.send({});
                }).catch((err) => {
                    return res.status(400).send(err);
                });
        },
        unlikePost(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const postId = req.body.postId;
            return data.posts.getById(postId)
                .then((post) => {
                    return Promise.all([
                        data.users.checkIfPostIsRated(req.user.liked, post),
                        post,
                    ]);
                }).then(([liked, post]) => {
                    if (!liked) {
                        return Promise.reject(
                            'You already unliked this picture!');
                    }
                    return data.users.deleteFromLiked(req.user._id, post);
                }).then(() => {
                    return data.posts.unlike(postId);
                }).then(() => {
                    return res.send({});
                }).catch((err) => {
                    return res.status(400).send(err);
                });
        },
        dislikePost(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const postId = req.body.postId;
            return data.posts.getById(postId)
                .then((post) => {
                    return Promise.all([
                        data.users.checkIfPostIsRated(req.user.disliked, post),
                        post,
                    ]);
                }).then(([disliked, post]) => {
                    if (disliked) {
                        return Promise.reject(
                            'You already disliked this picture!');
                    }
                    return data.users.addToDisliked(req.user._id, post);
                }).then(() => {
                    return data.posts.dislike(postId);
                }).then(() => {
                    return res.send({});
                }).catch((err) => {
                    return res.status(400).send(err);
                });
        },
        undislikePost(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const postId = req.body.postId;
            return data.posts.getById(postId)
                .then((post) => {
                    return Promise.all([
                        data.users.checkIfPostIsRated(req.user.disliked, post),
                        post,
                    ]);
                }).then(([disliked, post]) => {
                    if (!disliked) {
                        return Promise.reject(
                            'You already undisliked this picture!');
                    }
                    return data.users.deleteFromDisliked(req.user._id, post);
                }).then(() => {
                    return data.posts.undislike(postId);
                }).then(() => {
                    return res.send({});
                }).catch((err) => {
                    return res.status(400).send(err);
                });
        },
        addToFavourites(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const postId = req.body.postId;
            return data.posts.getById(postId)
                .then((post) => {
                    return Promise.all([
                        data.users.checkIfPostIsRated(
                            req.user.favourites, post
                        ), post,
                    ]);
                }).then(([added, post]) => {
                    if (added) {
                        return Promise.reject(
                            'You already added to favourites this picture!');
                    }
                    return data.users.addToFavours(req.user._id, post);
                }).then(() => {
                    return res.send({});
                }).catch((err) => {
                    console.log(err);
                    return res.status(400).send(err);
                });
        },
        deleteFromFavourites(req, res) {
            if (!req.user) {
                return res.redirect('/login');
            }
            const postId = req.body.postId;
            return data.posts.getById(postId)
                .then((post) => {
                    return Promise.all([
                        data.users.checkIfPostIsRated(
                            req.user.favourites, post
                        ), post,
                    ]);
                }).then(([added, post]) => {
                    if (!added) {
                        return Promise.reject(
                            'You already delete from favourites this picture!');
                    }
                    return data.users.deleteFromFavours(req.user._id, post);
                }).then(() => {
                    return res.send({});
                }).catch((err) => {
                    console.log(err);
                    return res.status(400).send(err);
                });
        },
    };
};

module.exports = usersController;
