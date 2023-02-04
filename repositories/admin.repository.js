const { Product } = require("../models");

class AdminRepository {
  createProduct = async (productName, productInfo, price, productImage) => {
    await Product.create({
      productName,
      productInfo,
      price,
      category:"dog",
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
