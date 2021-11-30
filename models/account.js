const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EMAIL: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    PASSWORD: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    OWNER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sach',
        key: 'MASACH'
      }
    },
    STATUS: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Active"
    }
  }, {
    sequelize,
    tableName: 'account',
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
        name: "fk_account_sach",
        using: "BTREE",
        fields: [
          { name: "OWNER" },
        ]
      },
    ]
  });
};
