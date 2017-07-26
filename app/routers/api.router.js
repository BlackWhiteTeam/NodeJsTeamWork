const attachTo = (app, { apiController }) => {
    app.get('/api/users', apiController.getUsers);
    app.get('/api/users/:id', apiController.getUserById);
    app.get('/api/users/:id/posts', apiController.getUserPosts);
    app.get('/api/posts', apiController.getPosts);
    app.get('/api/posts/:id', apiController.getPostById);
};

module.exports = { attachTo };
