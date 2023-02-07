const AdminRepository = require("../repositories/admin.repository");

class AdminService {
  adminRepository = new AdminRepository();

  showAllUser = async () => {
    const users = await this.adminRepository.showAllUser();

    return users;
  }

  deleteUser = async (user_idx) => {
    await this.adminRepository.deleteUser(user_idx);

    return;
  }

  showAllProduct = async () => {
    const data = await this.adminRepository.showAllProduct();

    return data;
  }

  createProduct = async (productName, productInfo, price, productImage, category) => {
    try {
      await this.adminRepository.createProduct(
        productName,
        productInfo,
        price,
        productImage,
        category
      );

      return;
    } catch (error) {
      throw error;
    }
  };

  updateProduct = async (productId, productName, productInfo, price) => {
    try {
      await this.adminRepository.updateProduct(
        productId,
        productName,
        productInfo,
        price
      );

      return;
    } catch (error) {
      throw error;
    }
  };

  deleteProduct = async (productId) => {
    try {
      await this.adminRepository.deleteProduct(productId);

      return;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AdminService;
