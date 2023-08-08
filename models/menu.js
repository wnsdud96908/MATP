const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    menu_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "메뉴 번호"
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
    food_ctgr_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "음식 종류 번호",
      references: {
        model: 'food_category',
        key: 'food_ctgr_no'
      }
    },
    menu_nm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "메뉴 명"
    },
    menu_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: "가격"
    }
  }, {
    sequelize,
    tableName: 'menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "menu_no" },
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
        name: "food_ctgr_no",
        using: "BTREE",
        fields: [
          { name: "food_ctgr_no" },
        ]
      },
    ]
  });
};
