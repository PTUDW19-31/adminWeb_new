const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('thanhtoan', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SOHD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hoadon',
        key: 'SOHD'
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
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'thanhtoan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "fk_thanhtoan_hoadon_idx",
        using: "BTREE",
        fields: [
          { name: "SOHD" },
        ]
      },
    ]
  });
};
