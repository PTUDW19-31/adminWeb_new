const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('khachhang', {
    MAKH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'ID'
      }
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
    NGAYSINH: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IDCART: {
      type: DataTypes.INTEGER,
      allowNull: true
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
        name: "fk_khachhang_account1_idx",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
      {
        name: "fk_khachhang_giohang1_idx",
        using: "BTREE",
        fields: [
          { name: "IDCART" },
        ]
      },
    ]
  });
};
