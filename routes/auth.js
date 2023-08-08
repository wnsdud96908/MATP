const express = require("express");
const passport = require("passport");

const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const {join, login, logout, idChk, nickChk, emailChk, phoneChk, exUserChk, searchId, searchPw, authChk, kakaoLogout} = require("../controllers/auth");

const router = express.Router();


router.use((req, res, next) => {
    // console.log("11111111111111111->", req.user);
    res.locals.user = req.user;
    // res.locals.session= req.session.accessToken;
    next();
});


router.post("/join", isNotLoggedIn, join);
router.post("/idChk/join", idChk);
router.post("/nickChk/join", nickChk);
router.post("/phoneChk/join", phoneChk);
router.post("/authChk/join", authChk);
router.post("/emailChk/join", emailChk);

router.post("/login", isNotLoggedIn, exUserChk, login);
router.post("/logout", isLoggedIn, logout);

router.post("/searchId", searchId);
router.post("/searchPw", searchPw);


router.get("/kakao", passport.authenticate("kakao"));

router.get("/kakao/callback", passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패",
}), (req, res) => {
    res.redirect("/");
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.render('join', { title: 'join' });
});

router.get('/login', isNotLoggedIn, (req, res, next) => {
    res.render('login', { title: 'login' });
});

router.get("/logout", async (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
});

router.get("/kakaoLogout",kakaoLogout);

router.get("/searchId", (req, res, next) => {
    res.render("searchId", {title: "아이디 찾기"});
});

router.get("/searchPw", (req, res, next) => {
    res.render("searchPw", {title: "비밀번호 찾기"});
});

router.get("/searchInform/id/:id", (req, res ,next) => {
    const {id} = req.params;
    res.render("searchInform", {title: "내정보 찾기 완료", id});
})

router.get("/searchInform/password/:pw", (req, res ,next) => {
    const {pw} = req.params;
    res.render("searchInform", {title: "내정보 찾기 완료", pw});
})

module.exports = router;
