const AdminRepository = require("../repositories/admin.repository");

class AdminService {
  adminRepository = new AdminRepository();

  createProduct = async (productName, productInfo, price, productImage) => {
    try {
      await this.adminRepository.createProduct(
        productName,
        productInfo,
        price,
        productImage
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
