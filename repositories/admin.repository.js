const { Product } = require("../models");

class AdminRepository {
  createProduct = async (productName, productInfo, price, productImage) => {
    try {
      await Product.create({
        productName,
        productInfo,
        price,
        category:"dog",
        productImage,
      });
  
      return;
    } catch (error) {
      error.status = 500;
      error.message = "상품 등록 실패 !"
      throw error
    }
  };

  updateProduct = async (productId, productName, productInfo, price) => {
    try {
      const id = await Product.findOne({
        where: { id: productId}
      })
  
      if (!id) {
        const error = new Error();
        error.status = 412;
        error.message = "해당하는 상품이 존재하지 않습니다.";
        throw error
      }
  
      await Product.update(
        { productName, productInfo, price },
        { where: { id: productId } }
      );

      return
    } catch (error) {
      throw error
    }
  }

  deleteProduct = async (productId) => {
    try {
      const id = await Product.findOne({
        where: { id: productId}
      })
  
      if (!id) {
        const error = new Error();
        error.status = 412;
        error.message = "해당하는 상품이 존재하지 않습니다.";
        throw error
      }

      await Product.destroy({
        where: { id: productId },
      });
  
      return;
    } catch (error) {
      throw error
    }
  };
}

module.exports = AdminRepository;
