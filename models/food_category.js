const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('food_category', {
    food_ctgr_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "음식 종류 번호"
    },
    food_ctgr_nm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "음식 종류 명"
    }
  }, {
    sequelize,
    tableName: 'food_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "food_ctgr_no" },
        ]
      },
    ]
  });
};
