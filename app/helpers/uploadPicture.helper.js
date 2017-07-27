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


module.exports = { uploadPicture };
