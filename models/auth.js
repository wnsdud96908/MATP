const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth', {
    no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    tel_number: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "연락처",
      unique: "auth_UN"
    },
    auth: {
      type: DataTypes.STRING(4),
      allowNull: true,
      comment: "인증번호"
    },
    expire: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "만료시간"
    },
    ok: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "인증완료"
    }
  }, {
    sequelize,
    tableName: 'auth',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "no" },
        ]
      },
      {
        name: "auth_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tel_number" },
        ]
      },
    ]
  });
};
