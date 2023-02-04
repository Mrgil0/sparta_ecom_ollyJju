
const { Product } = require("../models");

class ProductRepository {
  showNewProduct = async () => {
    try {
      const data = await Product.findAll({
        order: [["createdAt", "DESC"]],
      });

      const returndata = data.map((data) => {
        const { id, productImage, productName, price, category } = data;

        return {
          id,
          productImage,
          productName,
          price,
          category,
        };
      });

      return returndata;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  showBestProduct = async () => {
    try {
      const data = await Product.findAll({
        where: {category: "best"},
        order: [["createdAt", "DESC"]],
      });

      const returndata = data.map((data) => {
        const { id, productImage, productName, price, category } = data;

        return {
          id,
          productImage,
          productName,
          price,
          category,
        };
      });

      return returndata;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  findOneProduct = async (productId) => {
    try {
      const data = await Product.findOne({
        where: { id: productId },
      });

      return data;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  findProductId = async (productId) => {
    try {
      const dbproductId = await Product.findOne({
        where: { id: productId },
      });

      return dbproductId.id;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };
}

module.exports = ProductRepository;
