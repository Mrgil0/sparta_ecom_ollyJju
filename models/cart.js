'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, Product }) {
      this.belongsTo(user, { foreignKey: 'user_email', targetKey: 'user_email'},)
      this.belongsTo(Product, { foreignKey: 'product_idx', targetKey: 'id'})
      // define association here
    }
  }
  cart.init({
    product_idx: DataTypes.INTEGER,
    user_email: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};