const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('khachhang', {
    MAKH: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TENKH: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DIACHI: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    DIENTHOAI: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    GIOITINH: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    NGAYSINH: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IDACCOUNT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'khachhang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
      {
        name: "fk_khachhang_account_idx",
        using: "BTREE",
        fields: [
          { name: "IDACCOUNT" },
        ]
      },
    ]
  });
};
