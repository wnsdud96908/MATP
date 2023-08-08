const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_no: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "유저번호"
    },
    user_type_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "회원 유형 번호",
      references: {
        model: 'user_type',
        key: 'user_type_no'
      }
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "아이디",
      unique: "user_id"
    },
    user_pwd: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "비밀번호"
    },
    user_nm: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "이름"
    },
    user_nick: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "닉네임",
      unique: "user_nick"
    },
    user_img: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "프로필 사진"
    },
    user_gender: {
      type: DataTypes.STRING(4),
      allowNull: true,
      comment: "성별"
    },
    user_birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "생일"
    },
    user_tel: {
      type: DataTypes.STRING(13),
      allowNull: true,
      comment: "연락처"
    },
    user_addr: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "주소"
    },
    user_addr_detail: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "상세주소"
    },
    user_email: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: "이메일"
    },
    user_leave: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "회원탈퇴여부"
    },
    snsId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    provider: {
      type: DataTypes.ENUM('local','kakao'),
      allowNull: false,
      defaultValue: "local"
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_no" },
        ]
      },
      {
        name: "user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_nick",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_nick" },
        ]
      },
      {
        name: "user_type_no",
        using: "BTREE",
        fields: [
          { name: "user_type_no" },
        ]
      },
    ]
  });
};
