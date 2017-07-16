const attachTo = (app, data) => {
    app.get('/gallery', (req, res) => {
        return data.posts.getAll()
            .then((posts) => {
                return res.render('gallery', {
                    context: posts,
                });
            });
    });

    app.get('/createPost', (req, res) => {
        const post = {
            author: req.user,
            picture: req.body.picture,
            // Gizi should implement this!
        };
    });
};

module.exports = { attachTo };
