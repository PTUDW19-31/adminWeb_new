const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sach', {
    MASACH: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    TENSACH: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    LOAISACH: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    GIA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    URL: {
      type: DataTypes.STRING(45),
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
