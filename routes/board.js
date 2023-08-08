const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {board} = require('../models');
const {isLoggedIn} = require("../middlewares");
const {renderCreate, renderDetail, renderUpdate, renderDelete} = require("../controllers/board")

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
// 목록
router.get('/create', isLoggedIn, (req, res) => {
    res.render('create');
})
router.get('/create/:id', isLoggedIn, (req, res) => {
    res.render('create');
});
//상세페이지
router.get('/detail/:board_no', renderDetail);

// 게시글 수정
router.get('/update/:board_no',isLoggedIn, renderUpdate);

//게시글 삭제
router.post('/delete/:board_no', renderDelete);


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
//게시글 수정
router.post('/update/:board_no', upload.array('files'), async(req, res) => {
    const boardNo = req.params.board_no;
    const {board_title, board_content} = req.body;
    console.log("11111111111", req.body);
    try {
        const files = [];
        for(const file of req.files){
            files.push({ filename: file.filename, url: `/img/${file.filename}` });
        };
        const boards = await board.update({
            board_title: board_title,
            board_content: board_content,
            img: files,
        },{
            where: {board_no: boardNo}
        });
        if (boards === null) {
            console.log("게시물 수정 에러!");
            res.status(400).json({"msg": "uploadError"});
        } else {
            console.log("게시물 수정!");
            res.status(200).json({"msg":"uploadSuccess"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({"msg": error});
    }
});
// 이미지 업로드
router.post("/multiple-upload", upload.array('files'), async(req, res) => {
    const {title, content} = req.body;

    try{
        const files = [];
        for(const file of req.files){
            files.push({ filename: file.filename, url: `/img/${file.filename}` });
        };
        const upload = await board.create({
            board_title: title,
            user_no: req.user.user_no,
            board_content: content,
            img:files,
        });
        if(upload === null){
            console.log("게시물 등록 에러!");
            res.status(400).json({"msg":"uploadError"});
        }else{
            console.log("게시물 등록!");
            res.status(200).json({"msg":"uploadSuccess"});
        };
    }catch (error){
        console.error(error);
        res.status(500).json({"msg":error});
    };
});

module.exports = router;