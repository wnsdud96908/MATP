const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    review_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "리뷰 등록번호"
    },
    store_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "가게 번호",
      references: {
        model: 'stores',
        key: 'store_no'
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
    review_content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "리뷰 내용"
    },
    star_cnt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "별점"
    },
    review_del: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "삭제"
    }
  }, {
    sequelize,
    tableName: 'reviews',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "review_no" },
        ]
      },
      {
        name: "store_no",
        using: "BTREE",
        fields: [
          { name: "store_no" },
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
