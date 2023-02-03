const AdminService = require("../services/admin.service");

class AdminConteroller {
  adminService = new AdminService();

  createProduct = async (req, res) => {
    const { productName, productInfo, price } = req.body;
    const productImage = req.file.path;

    console.log(price,productImage,productInfo,productName)
    await this.adminService.createProduct(
      productName,
      productInfo,
      price,
      productImage
    );

    res.status(201).json({ message: "상품 등록 완료!" });
  };
}

module.exports = AdminConteroller;
