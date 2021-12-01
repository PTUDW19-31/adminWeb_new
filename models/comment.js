const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MASACH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sach',
        key: 'MASACH'
      }
    },
    MAKH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    },
    NOIDUNG: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    CREATE_AT: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UPDATE_AT: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
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
        name: "fk_comment_khachhang",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
      {
        name: "fk_comment_sach",
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
    ]
  });
};
