var DataTypes = require("sequelize").DataTypes;
var _Hogyuns = require("./Hogyuns");
var _Items = require("./Items");
var _Orders = require("./Orders");
var _Products = require("./Products");
var _SequelizeMeta = require("./SequelizeMeta");

function initModels(sequelize) {
  var Hogyuns = _Hogyuns(sequelize, DataTypes);
  var Items = _Items(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);


  return {
    Hogyuns,
    Items,
    Orders,
    Products,
    SequelizeMeta,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
