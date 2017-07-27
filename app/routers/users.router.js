const attachTo = (app, { usersController }) => {
    app.get('/users', usersController.renderAllUsers);
    app.get('/register', usersController.renderRegisterPage);
    app.post('/register', usersController.registerUser);
    app.get('/login', usersController.renderLoginPage);
    app.post('/login', usersController.loginUser);
    app.get('/users/:id', usersController.getProfilePage);
    app.post('/users/:id', usersController.updateProfilePicture);
    app.post('/users', usersController.searchUser);
    app.get('/logout', usersController.userLogout);
    app.post('/like', usersController.likePost);
    app.post('/unlike', usersController.unlikePost);
    app.post('/dislike', usersController.dislikePost);
    app.post('/undislike', usersController.undislikePost);
};

module.exports = { attachTo };
