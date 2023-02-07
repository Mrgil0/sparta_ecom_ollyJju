'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({order}) {
      this.hasMany(order, { foreignKey: 'order_idx', targetKey: 'order_idx'})
      // define association here
    }
  }
  order_detail.init({
    order_detail_idx: DataTypes.INTEGER,
    order_idx: DataTypes.INTEGER,
    product_idx: DataTypes.INTEGER,
    order_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};