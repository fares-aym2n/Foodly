const path = require('path');
const app = require('express');
const multer = require('multer');
const authController = require('../controller/authControoler');
const AppError = require('../utils/AppError');
const router = app.Router();

const distStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const upload = multer({
  storage: distStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.split('/')[0] === 'image') {
      cb(null, true);
    } else {
      cb(new AppError('file must be an image', 400), false);
    }
  },
});

router
  .route('/register')
  .post(upload.single('avatar'), authController.register);
router.route('/login').post(authController.login);

module.exports = router;
