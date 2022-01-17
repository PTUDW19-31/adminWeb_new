const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sach_has_category', {
    MASACH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sach',
        key: 'MASACH'
      }
    },
    CATEGORY_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'CATEGORY_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'sach_has_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MASACH" },
          { name: "CATEGORY_ID" },
        ]
      },
      {
        name: "fk_sach_has_category_sach1_idx",
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
      {
        name: "fk_sach_has_category_category_idx",
        using: "BTREE",
        fields: [
          { name: "CATEGORY_ID" },
        ]
      },
    ]
  });
};
