var express = require('express');
var router = express.Router();
const {Op} = require("sequelize");
const {stores, board} = require("../models");
const multer = require("multer");
const path = require("path");
const {renderSearch, renderCreate} = require("../controllers/search");

/* GET home page. */
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
router.get('/', renderSearch);


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const fileName = `${path.basename(
                file.originalname,
                ext
            )}_${Date.now()}${ext}`;
            done(null, fileName);
        }
    }),
    fileFilter : (req, file, cb) => {
        const typeArray = file.mimetype.split('/');
        const fileType = typeArray[1];

        if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
            req.fileValidationError = null;
            cb(null, true);
        } else {
            req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
            cb(null, false)
        };
    },
    limits : { fileSize: 5 * 1024 * 1024 },
});

router.post("/multiple-upload", upload.array('files'), renderCreate);

module.exports = router;