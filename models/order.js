'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Order.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.BIGINT,
    price: DataTypes.STRING,
    count: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};