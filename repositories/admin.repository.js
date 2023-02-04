const { Product } = require("../models");

class AdminRepository {
  createProduct = async (productName, productInfo, price, productImage, category) => {
    await Product.create({
      productName,
      productInfo,
      price,
      category,
      productImage,
    });

    return;
  };

  deleteProduct = async (productId) => {
    await Product.destroy({
      where: { id: productId },
    });

    return;
  };
}

module.exports = AdminRepository;
