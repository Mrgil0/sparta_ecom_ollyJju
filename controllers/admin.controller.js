const AdminService = require("../services/admin.service");

class AdminConteroller {
  adminService = new AdminService();

  createProduct = async (req, res) => {
    const { productName, productInfo, price } = req.body;
    const productImage = req.file.path;
    console.log(productImage);
    
    await this.adminService.createProduct(
      productName,
      productInfo,
      price,
      productImage
    );

    res.status(201).json({ message: "상품 등록 완료 !" });
  };

  deleteProduct = async (req, res) => {
    const { productId } = req.params;

    await this.adminService.deleteProduct(productId);

    res.status(200).json({ message: "상품 삭제 완료 !" });
  };
}

module.exports = AdminConteroller;
