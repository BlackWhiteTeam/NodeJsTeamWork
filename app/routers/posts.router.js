const uploadPictureController =
    require('../helpers/uploadPicture.helper');

const attachTo = (app, { postsController }) => {
    app.get('/gallery', postsController.renderAllPosts);
    app.get('/myphotos', postsController.renderPostsOfUser);
    app.get('/createPost', postsController.renderCreatePost);
    app.get('/myfavorites', postsController.renderUserFavourites);
    app.post('/createPost', postsController.createPost);

    // think better for better way
    app.post('/showPicture',
        uploadPictureController.upload.single('imageupload'),
        postsController.showPicture);
};

module.exports = { attachTo };
