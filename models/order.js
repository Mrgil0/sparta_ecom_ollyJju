'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({order_detail}) {
      this.hasMany(order_detail, { foreignKey: 'order_idx', targetKey: 'order_idx'})
      // define association here
    }
  }
  order.init({
    order_idx: DataTypes.INTEGER,
    user_idx: DataTypes.INTEGER,
    order_address: DataTypes.STRING,
    order_status: DataTypes.STRING,
    receiver_name: DataTypes.STRING,
    receiver_phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};