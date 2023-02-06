'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cart }) {
      this.hasMany(cart, { foreignKey: 'id', targetKey: 'product_idx'})
      // define association here
    }
  }
  Product.init({
    productImage: DataTypes.STRING,
    productName: DataTypes.STRING,
    productInfo: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};