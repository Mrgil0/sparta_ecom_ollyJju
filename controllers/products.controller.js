const ProductService = require("../services/products.service");
const ChatRepository = require("../repositories/chats.repository");
const { cart } = require('../models')

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
    let {page} = req.body;
    let offset = 0;
    if(page > 0){
      offset = (Number(page)-1)*5
    }
    try {
      const data = await this.productService.showAllProduct(offset);

      res.status(200).json({ "data": data});
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  findOneProduct = async (req, res) => {
    try {
      const {productId} = req.params;
      console.log(productId)
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
      const user_email = res.locals.user.user_email
      
      const count = product_quantity
      
      const dbproductId = await this.productService.findProductId(productId);
      
      const product_idx = dbproductId

      const isProduct = await cart.findOne({ where: { product_idx, user_email }})
     
      if (!isProduct) {
        const cartDB = await cart.create({ product_idx, user_email ,count })
        console.log(cartDB)
      } else {
        return res.status(201).json({ message: '이미 장바구니에 담겨있는 상품입니다.'})
      }
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
