const AdminRepository = require("../repositories/admin.repository");

class AdminService {
  adminRepository = new AdminRepository();

  createProduct = async (productName, productInfo, price, productImage, adminuser) => {
    // const admin_user = res.locals.user_name
    // console.log(admin_user)
    await this.adminRepository.createProduct(
      productName,
      productInfo,
      price,
      productImage,
      
    );

    return
  };
}

module.exports = AdminService;
