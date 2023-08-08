const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wish_list', {
    wish_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "즐겨찾기 번호"
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
    }
  }, {
    sequelize,
    tableName: 'wish_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wish_no" },
        ]
      },
      {
        name: "user_no",
        using: "BTREE",
        fields: [
          { name: "user_no" },
        ]
      },
      {
        name: "store_no",
        using: "BTREE",
        fields: [
          { name: "store_no" },
        ]
      },
    ]
  });
};
