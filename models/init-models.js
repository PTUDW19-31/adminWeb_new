var DataTypes = require("sequelize").DataTypes;
var _chitiethoadon = require("./chitiethoadon");
var _hoadon = require("./hoadon");
var _khachhang = require("./khachhang");
var _sach = require("./sach");

function initModels(sequelize) {
  var chitiethoadon = _chitiethoadon(sequelize, DataTypes);
  var hoadon = _hoadon(sequelize, DataTypes);
  var khachhang = _khachhang(sequelize, DataTypes);
  var sach = _sach(sequelize, DataTypes);

  hoadon.belongsToMany(sach, { as: 'MASACH_saches', through: chitiethoadon, foreignKey: "SOHD", otherKey: "MASACH" });
  sach.belongsToMany(hoadon, { as: 'SOHD_hoadons', through: chitiethoadon, foreignKey: "MASACH", otherKey: "SOHD" });
  chitiethoadon.belongsTo(hoadon, { as: "SOHD_hoadon", foreignKey: "SOHD"});
  hoadon.hasMany(chitiethoadon, { as: "chitiethoadons", foreignKey: "SOHD"});
  hoadon.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(hoadon, { as: "hoadons", foreignKey: "MAKH"});
  chitiethoadon.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(chitiethoadon, { as: "chitiethoadons", foreignKey: "MASACH"});

  return {
    chitiethoadon,
    hoadon,
    khachhang,
    sach,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
