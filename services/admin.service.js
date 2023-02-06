const AdminRepository = require("../repositories/admin.repository");

class AdminService {
  adminRepository = new AdminRepository();

  createProduct = async (productName, productInfo, price, productImage) => {
    await this.adminRepository.createProduct(
      productName,
      productInfo,
      price,
      productImage,
    );

    return
  };

  updateProduct = async (productId, productName, productInfo, price) => {
    await this.adminRepository.updateProduct(productId, productName, productInfo, price);

    return
  }

  deleteProduct = async (productId) => {
    await this.adminRepository.deleteProduct(productId);

    return
  }
}

module.exports = AdminService;
