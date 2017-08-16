const Jimp = require('jimp');
const cloudinary = require('cloudinary');

const makePictureBlack = (photo, path) => {
    return Jimp.read(path)
        .then((img) => {
            return img.greyscale().write(path);
        })
        .catch((err) => {
            console.error(err);
        });
};

const uploadPicture = (photo) => {
    const pathToSave = './public/uploads/' + photo.filename;
    return makePictureBlack(photo, pathToSave)
        .then(() => {
            return cloudinary.uploader.upload(pathToSave, (result) => {
                return result;
            });
    });
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

const getFavourites = (posts, req) => {
    posts.forEach((post) => {
        post.isAdded = req.user.favourites
                .findIndex(
                    (p) => p._id.toString() === post._id.toString()
                ) >= 0;
    });
};


module.exports = { uploadPicture, getLikedAndDisliked, getFavourites };
