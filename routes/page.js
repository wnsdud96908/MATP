const express = require("express");
const {isNotLoggedIn} = require("../middlewares");
const { renderJoin, renderMain, renderLogin, renderBoard, renderList, renderstorewrite, renderStore, renderReady} = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get("/ready", renderReady);
router.get('/board', renderBoard);
router.get("/login", isNotLoggedIn, renderLogin);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);
router.get("/list", renderList);
router.get('/store/:store_no', renderStore);
router.get("/list/storewrite", renderstorewrite);

module.exports = router;