const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    board_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "게시판 번호"
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
    board_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "제목"
    },
    board_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    img: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'board',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
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
