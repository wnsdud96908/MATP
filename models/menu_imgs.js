const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu_imgs', {
    menu_imgs_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "메뉴 이미지 번호"
    },
    menu_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "메뉴 번호",
      references: {
        model: 'menu',
        key: 'menu_no'
      }
    },
    menu_imgs_ori_nm: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "원본 명"
    },
    menu_imgs_up_nm: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "업로드 명"
    }
  }, {
    sequelize,
    tableName: 'menu_imgs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "menu_imgs_no" },
        ]
      },
      {
        name: "menu_no",
        using: "BTREE",
        fields: [
          { name: "menu_no" },
        ]
      },
    ]
  });
};
