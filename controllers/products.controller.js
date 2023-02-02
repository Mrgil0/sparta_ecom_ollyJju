const ProductService = require("../services/products.service");

class ProductController {
  productService = new ProductService();

  showAllProduct = async (req, res, next) => {
    try {
      const data = await this.productService.showAllProduct();

      res.status(200).json({ data });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  findOneProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const data = await this.productService.findOneProduct(productId);

      res.status(200).json({ data });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  productAddCart = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { product_quantity } = req.body;

      // if (productId === undefined) {
      //   res.status(412).send({ message: "해당하는 상품이 존재하지 않습니다." });
      // }
      // if (product_quantity < 1) {
      //   res.status(412).send({ message: "개수를 정해주세요." });
      // }

      res.locals.product = { productId, product_quantity };

      res.status(201).json({ message: "장바구니에 담겼습니다." });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };
}

module.exports = ProductController;
