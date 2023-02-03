const AdminRepository = require("../repositories/admin.repository");

class AdminService {
  adminRepository = new AdminRepository();

  createProduct = async (productName, productInfo, price, productImage) => {
    await this.adminRepository.createProduct(
      productName,
      productInfo,
      price,
      productImage
    );

    return
  };
}

module.exports = AdminService;
