const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sach', {
    MASACH: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TENSACH: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    GIA: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    IMAGE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    STATUS: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Active"
    },
    IMAGE_PUBLICID: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sach',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
    ]
  });
};
