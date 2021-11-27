const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('khachhang', {
    MAKH: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    TENKH: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DIACHI: {
      type: DataTypes.STRING(50),
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
    ]
  });
};
