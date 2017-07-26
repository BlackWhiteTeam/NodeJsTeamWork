const uploadPictureHelper =
    require('../helpers/uploadPicture.helper');
// put in helper
const getIdByUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

const attachTo = (app, { usersController }) => {
    app.get('/users', usersController.renderAllUsers);

    app.get('/register', usersController.renderRegisterPage);


    app.post('/register', usersController.registerUser);


    app.get('/login', usersController.renderLoginPage);

    app.post('/login', usersController.loginUser);

    app.get('/users/:id', usersController.getProfilePage);

    // eslint-disable-next-line
    app.post('/users/:id', uploadPictureHelper.upload.single('imageupload'), usersController.updateProfilePicture);

    app.post('/users', usersController.searchUser);

    app.get('/logout', usersController.userLogout);
};

module.exports = { attachTo };