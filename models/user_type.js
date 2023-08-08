const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_type', {
    user_type_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "회원유형 번호"
    },
    user_type_nm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "회원유형 명"
    }
  }, {
    sequelize,
    tableName: 'user_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_type_no" },
        ]
      },
    ]
  });
};
