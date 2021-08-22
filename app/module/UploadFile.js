const dateFormat = require('dateformat');
const path = require('path');
const multer = require('multer');

const StorageImage = multer.diskStorage({
    destination: './public/images/uploads/',
    filename: function(req, file, cb) {
        let DateUpdate = dateFormat(new Date(), "dd-mm-yyyy");
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        cb(null, DateUpdate + '-' + file.originalname);
    }
})

const StorageAvatar = multer.diskStorage({
    destination: './public/images/avatars/',
    filename: function(req, file, cb) {
        let DateUpdate = dateFormat(new Date(), "dd-mm-yyyy");
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        cb(null, DateUpdate + '-' + file.originalname);
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

let Upload = multer({
    storage: StorageImage,
    limits: { fileSize: 10 * 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image_file');

let AvatarUpload = multer({
    storage: StorageAvatar,
    limits: { fileSize: 10 * 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image_file_avatar');

module.exports = {
    Upload: Upload,
    AvatarUpload: AvatarUpload
}