const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hoadon', {
    SOHD: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    NGAYLAPHD: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    MAKH: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
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
