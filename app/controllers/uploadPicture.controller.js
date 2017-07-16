const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.split('.');
        cb(null, Date.now() + '.' + filename[filename.length - 1]);
    },
});
const upload = multer({ storage: storage });

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


module.exports = { upload, uploadPicture };
