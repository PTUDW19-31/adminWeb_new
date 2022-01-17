const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unknowcart', {
    UNID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDCART: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "IDCART_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'unknowcart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UNID" },
        ]
      },
      {
        name: "IDCART_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDCART" },
        ]
      },
    ]
  });
};
