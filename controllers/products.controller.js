const ProductService = require("../services/products.service");
const ChatRepository = require("../repositories/chats.repository");

let product = {}

class ProductController {

  productService = new ProductService();

  productMiddleware = async (req, res, next) => {
    if (!product) {
      res.locals.product = false;
      next()
    }
    res.locals.product = product 
    console.log(res.locals.product)
    next()
  }

  showAllProduct = async (req, res) => {
    try {
      const data = await this.productService.showAllProduct();

      res.status(200).json({ "data": data});
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  findOneProduct = async (req, res) => {
    try {
      const {productId} = req.params;
      const data = await this.productService.findOneProduct(productId);

      res.status(200).json({data})
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  productAddCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const { product_quantity } = req.body;

      const dbproductId = await this.productService.findProductId(productId);

      if (dbproductId === undefined) {
        res.status(412).json({ message: "해당하는 상품이 존재하지 않습니다." });
      }

      if (Number(product_quantity) < 1) {
        const error = new Error();
        error.status = 412;
        error.message = "개수를 정해주세요.";
        throw error;
      }

      product = { productId, product_quantity };
      
      res.status(201).json({ message: "장바구니에 담았습니다." });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };
}

module.exports = ProductController;
