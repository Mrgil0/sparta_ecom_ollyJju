const AdminService = require("../services/admin.service");

class AdminConteroller {
  adminService = new AdminService();

  showAllUser = async (req, res) => {
    const user_type = res.locals.user.user_type;
    if (user_type === "admin") {
      const users = await this.adminService.showAllUser();

      res.status(200).json({users});
    } else {
      res.status(500).json({message: "정보가 없습니다."});
    }

  }

  deleteUser = async (req, res) => {
    const {user_idx} = req.params;
    console.log(user_idx)
    const user_type = res.locals.user.user_type;

    if (user_type === "admin") {
      await this.adminService.deleteUser(user_idx);

      res.status(200).json({message: "탈퇴 성공 !"});
    } else {
      res.status(500).json({message: "정보가 없습니다."});
    }

  }

  showAllProduct = async (req, res) => {
    const data = await this.adminService.showAllProduct();

    if (!data) {
      res.status(500).json({message: "데이터가 없습니다."})
    } 

    res.status(200).json({data});
  }

  createProduct = async (req, res, next) => {
    try {
      const { productName, productInfo, price, category } = req.body;
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
        productImage,
        category
      );

      res.send({ message: "상품 등록 완료 !" });     
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
