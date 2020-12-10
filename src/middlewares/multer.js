const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
      },
      filename: function (req, file, cb) {
        const newFileName = `${Date.now()}-${file.originalname}`;
        cb(null, newFileName);
      },
})

const limits = {
    fileSize: 1024 * 1024 * 5
}

const fileFilter = (req, file, cb) => {
    const mime = /jpg|webp|gif|png|jpeg|svg/;
    const extName = mime.test(path.extname(file.originalname).toLowerCase());
    if (extName) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({ storage, fileFilter, limits }).single('photo')