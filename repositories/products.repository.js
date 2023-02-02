const { Item } = require("../models");

class ProductRepository {
  showAllProduct = async () => {
    try {
      const data = await Item.findAll({
        order: [["createdAt", "DESC"]],
      });

      const returndata = data.map((data) => {
        const { id, productImage, productName, price } = data;

        return {
          id,
          productImage,
          productName,
          price,
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
      const data = await Item.findOne({
        where: { id: productId },
      });

      return data;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };
}

module.exports = ProductRepository;
