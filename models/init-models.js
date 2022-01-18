var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _category = require("./category");
var _chitiethoadon = require("./chitiethoadon");
var _chitietsach = require("./chitietsach");
var _comment = require("./comment");
var _giohang = require("./giohang");
var _hoadon = require("./hoadon");
var _khachhang = require("./khachhang");
var _sach = require("./sach");
var _sach_has_category = require("./sach_has_category");
var _unknowcart = require("./unknowcart");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var chitiethoadon = _chitiethoadon(sequelize, DataTypes);
  var chitietsach = _chitietsach(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var giohang = _giohang(sequelize, DataTypes);
  var hoadon = _hoadon(sequelize, DataTypes);
  var khachhang = _khachhang(sequelize, DataTypes);
  var sach = _sach(sequelize, DataTypes);
  var sach_has_category = _sach_has_category(sequelize, DataTypes);
  var unknowcart = _unknowcart(sequelize, DataTypes);

  category.belongsToMany(sach, { as: 'MASACH_sach_sach_has_categories', through: sach_has_category, foreignKey: "CATEGORY_ID", otherKey: "MASACH" });
  hoadon.belongsToMany(sach, { as: 'MASACH_saches', through: chitiethoadon, foreignKey: "SOHD", otherKey: "MASACH" });
  sach.belongsToMany(category, { as: 'CATEGORY_ID_categories', through: sach_has_category, foreignKey: "MASACH", otherKey: "CATEGORY_ID" });
  sach.belongsToMany(hoadon, { as: 'SOHD_hoadons', through: chitiethoadon, foreignKey: "MASACH", otherKey: "SOHD" });
  khachhang.belongsTo(account, { as: "MAKH_account", foreignKey: "MAKH"});
  account.hasOne(khachhang, { as: "khachhang", foreignKey: "MAKH"});
  sach_has_category.belongsTo(category, { as: "CATEGORY", foreignKey: "CATEGORY_ID"});
  category.hasMany(sach_has_category, { as: "sach_has_categories", foreignKey: "CATEGORY_ID"});
  chitiethoadon.belongsTo(hoadon, { as: "SOHD_hoadon", foreignKey: "SOHD"});
  hoadon.hasMany(chitiethoadon, { as: "chitiethoadons", foreignKey: "SOHD"});
  comment.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(comment, { as: "comments", foreignKey: "MAKH"});
  hoadon.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(hoadon, { as: "hoadons", foreignKey: "MAKH"});
  chitiethoadon.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(chitiethoadon, { as: "chitiethoadons", foreignKey: "MASACH"});
  chitietsach.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasOne(chitietsach, { as: "chitietsach", foreignKey: "MASACH"});
  comment.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(comment, { as: "comments", foreignKey: "MASACH"});
  giohang.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(giohang, { as: "giohangs", foreignKey: "MASACH"});
  sach_has_category.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(sach_has_category, { as: "sach_has_categories", foreignKey: "MASACH"});

  return {
    account,
    category,
    chitiethoadon,
    chitietsach,
    comment,
    giohang,
    hoadon,
    khachhang,
    sach,
    sach_has_category,
    unknowcart,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
