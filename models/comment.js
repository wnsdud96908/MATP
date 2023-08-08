const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    comment_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "댓글 번호"
    },
    board_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "게시판 번호",
      references: {
        model: 'board',
        key: 'board_no'
      }
    },
    user_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "회원 번호",
      references: {
        model: 'users',
        key: 'user_no'
      }
    },
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    create_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "등록일자"
    },
    update_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "수정일자"
    },
    comment_del: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "삭제"
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_no" },
        ]
      },
      {
        name: "board_no",
        using: "BTREE",
        fields: [
          { name: "board_no" },
        ]
      },
      {
        name: "user_no",
        using: "BTREE",
        fields: [
          { name: "user_no" },
        ]
      },
    ]
  });
};
