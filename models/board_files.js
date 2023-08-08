const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board_files', {
    board_files_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "첨부파일 번호"
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
    board_files_ori_nm: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "원본명"
    },
    board_files_up_nm: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "업로드명"
    }
  }, {
    sequelize,
    tableName: 'board_files',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "board_files_no" },
        ]
      },
      {
        name: "board_no",
        using: "BTREE",
        fields: [
          { name: "board_no" },
        ]
      },
    ]
  });
};
