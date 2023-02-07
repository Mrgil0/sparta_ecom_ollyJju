const { Product } = require("../models");
const {user} = require("../models")

class AdminRepository {

  showAllUser = async () => {
    const users = await user.findAll({
      where: {user_type: "guest"}
    });

    return users;
  }

  deleteUser = async (user_idx) => {
    await user.destroy({
      where: {user_idx},
    });

    return;
  }

  showAllProduct = async () => {
    const data = await Product.findAll({
      order: [['createdAt', 'DESC']],
    });

    return data;
  }

  createProduct = async (productName, productInfo, price, productImage, category) => {
    try {
      await Product.create({
        productName,
        productInfo,
        price,
        category,
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
