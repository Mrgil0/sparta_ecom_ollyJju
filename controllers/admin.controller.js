const AdminService = require("../services/admin.service");

class AdminConteroller {
  adminService = new AdminService();

  createProduct = async (req, res, next) => {
    try {
      const { productName, productInfo, price } = req.body;
      const file = req.file;

      if (!productName || !productInfo || !price || !file) {
        const error = new Error();
        error.status = 412;
        error.message = "모든 항목을 입력해 주세요 !";
        throw error;
      }

      const productImage = file.path;

      await this.adminService.createProduct(
        productName,
        productInfo,
        price,
        productImage
      );

      res.status(201).json({ message: true });     
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { productName, productInfo, price }  = req.body;
      console.log(productId, productName, productInfo, price);
      if (!productName || !productInfo || !price) {
        const error = new Error();
        error.status = 412;
        error.message = "모든 항목을 입력해 주세요 !";
        throw error;
      }

      await this.adminService.updateProduct(
        productId,
        productName,
        productInfo,
        price
      );

      res.status(200).json({ message: "상품 수정 완료 !" });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;

      await this.adminService.deleteProduct(productId);

      res.status(200).json({ message: "상품 삭제 완료 !" });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };
}

module.exports = AdminConteroller;
