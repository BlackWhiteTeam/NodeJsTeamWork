const passport = require('passport');

const uploadPictureHelper =
    require('../helpers/uploadPicture.helper');

const attachTo = (app, { usersController }) => {
    app.get('/users', usersController.renderAllUsers);
    app.get('/register', usersController.renderRegisterPage);
    app.post('/register', usersController.registerUser);
    app.get('/login', usersController.renderLoginPage);
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }), usersController.loginUser);
    app.get('/users/:id', usersController.getProfilePage);
    app.post('/users/:id', uploadPictureHelper.upload.single('imageupload')
        , usersController.updateProfilePicture);
    app.post('/users', usersController.searchUser);
    app.get('/logout', usersController.userLogout);
};

module.exports = { attachTo };
