const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // On nommera le fichier plus tard dans le contrôleur (après avoir l'id)
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
