const { board } = require('../models');

exports.renderCreate = (req, res) => {
    const id = req.user.user_id;
    res.redirect(`/board/create/${id}`);
}

exports.renderDetail = async (req, res) => {
    const board_no = req.params.board_no;
    const boards = await board.findOne({
        where: {board_no}
    })
    res.render("detail",{boards});
}

exports.renderUpdate = async(req, res) => {
    const boardNo = req.params.board_no;
    const boards = await board.findOne({
        where: {board_no: boardNo}
    })
    res.render("update", {boards});
}

exports.renderDelete = async (req, res) => {
    const boardNo = req.params.board_no;
    await board.destroy({
        where: { board_no: boardNo}
    });
    res.redirect('/board');
}