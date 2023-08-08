const { board, users, stores } =require("../models");
const moment = require('moment');

exports.renderProfile = (req, res) => {
    res.render("profile", {title: "profile"});
}

exports.renderJoin = (req, res) => {
    res.render("join", {title: "join"});
};

exports.renderLogin = (req, res) => {
    res.render("login", {title: "login"});
};

exports.renderMain = async (req, res, next) => {
    const PAGE_SIZE = 10;
    const store = await stores.findAll({
        limit: PAGE_SIZE,
    });
    res.render("index", {
        title: "MATP",
        store,
    });
};

exports.renderReady = async (req, res) => {
    res.render("ready", {title: "ready"})
};

exports.renderstorewrite = (req, res) => {
    res.render("storewrite", {title: "등록"});
}

exports.renderList = async (req, res, next) => {
    try {
        const PAGE_SIZE = 12;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const offset = (page - 1) * PAGE_SIZE;
        const total = await stores.count();
        const totalPages = Math.ceil(total / PAGE_SIZE);

        const store = await stores.findAll({
            nest: true,
            raw : true,
            order: [
                ["store_no", "DESC"]
            ],
            offset,
            limit: PAGE_SIZE,
        });

        res.render("search", {
            store,
            title: "커뮤니티",
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.renderStore = async (req, res) => {
    const store_no = req.params.store_no;
    const store = await stores.findOne({
        where: {store_no}
    })
    res.render("store",{store: store});
};

exports.renderBoard = async (req, res, next) => {
    try {
        const PAGE_SIZE = 5;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const offset = (page - 1) * PAGE_SIZE;
        const total = await board.count();
        const totalPages = Math.ceil(total / PAGE_SIZE);

        const boards = await board.findAll({
            nest: true,
            raw : true,
            order: [
                ["board_no", "DESC"]
            ],
            offset,
            limit: PAGE_SIZE,
        });

        boards.forEach((board) => {
            const createdAt = moment(board.createdAt);
            const duration = moment.duration(moment().diff(createdAt));
            const hours = duration.asHours();
            const days = duration.asDays();

            let dateStr = '';
            if(hours < 1) {
                dateStr = `${Math.round(duration.asMinutes())}분 전`;
            } else if (hours < 24) {
                dateStr = `${Math.round(hours)}시간 전`;
            } else {
                dateStr = `${Math.round(days)}일 전`;
            }

            board.createdAt = dateStr;
        });

        const button = req.user && req.user.user_no;

        res.render("board", {
            boards,
            button,
            title: "커뮤니티",
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};