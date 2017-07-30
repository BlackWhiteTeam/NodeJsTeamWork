const Jimp = require('jimp');

const makePictureBlack = (photo, path) => {
    Jimp.read(path)
        .then((img) => {
            img.greyscale().write(path);
        })
        .catch((err) => {
            console.error(err);
        });
};

const uploadPicture = (photo) => {
    const pathToSave = './public/uploads/' + photo.filename;
    makePictureBlack(photo, pathToSave);
};

const getLikedAndDisliked = (posts, req) => {
    posts.forEach((post) => {
        post.isLiked = req.user.liked
            .findIndex(
            (p) => p._id.toString() === post._id.toString()
            ) >= 0;
        post.isDisliked = req.user.disliked
            .findIndex(
            (p) => p._id.toString() === post._id.toString()
            ) >= 0;
    });
};


module.exports = { uploadPicture, getLikedAndDisliked };
