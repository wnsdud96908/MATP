const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review_imgs', {
    review_imgs_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "리뷰 이미지 번호"
    },
    review_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "리뷰 등록번호",
      references: {
        model: 'reviews',
        key: 'review_no'
      }
    },
    review_imgs_ori_nm: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "원본명"
    },
    review_imgs_up_nm: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "업로드명"
    }
  }, {
    sequelize,
    tableName: 'review_imgs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "review_imgs_no" },
        ]
      },
      {
        name: "review_no",
        using: "BTREE",
        fields: [
          { name: "review_no" },
        ]
      },
    ]
  });
};
