const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hoadon', {
    SOHD: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NGAYLAPHD: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    MAKH: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    },
    NGUOINHAN: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    DIACHI: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PHONE: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    STATUS: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "Chưa thanh toán"
    }
  }, {
    sequelize,
    tableName: 'hoadon',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SOHD" },
        ]
      },
      {
        name: "fk_hoadon_khachhang",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
    ]
  });
};
