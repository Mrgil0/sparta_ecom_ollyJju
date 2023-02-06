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

  updateProduct = async (productId, productName, productInfo, price) => {
    await Product.update(
      { productName, productInfo, price },
      { where: { id: productId } }
    );

    return
  }

  deleteProduct = async (productId) => {
    await Product.destroy({
      where: { id: productId },
    });

    return;
  };
}

module.exports = AdminRepository;
