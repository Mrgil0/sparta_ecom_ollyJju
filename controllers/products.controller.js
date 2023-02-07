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
    next()
  }

  showAllProduct = async (req, res) => {
    let {page, text, full_width, window_width} = req.body;
    let data = []
    try {
      if(text == '' || text == undefined){
        data = await this.productService.showAllProduct(page, full_width, window_width);
      } else {
        data = await this.productService.findSearchProduct(page, text, full_width, window_width);
      }
      res.status(200).json({ "data": data, "text": text});
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
      const user_email = res.locals.user.user_email

      const isProduct = await cart.findOne({ where: { product_idx: productId, user_email }})
     
      if (!isProduct) {
        await cart.create({ product_idx: productId, user_email ,count: product_quantity })
      } else {
        await cart.update({ count: Number(product_quantity) + 1}, {where: { product_idx: productId, user_email}})
      }
      if (productId === undefined) {
        res.status(412).json({ message: "해당하는 상품이 존재하지 않습니다." });
      }

      if (Number(product_quantity) < 1) {
        res.status(412).json({ message: "1개 이상의 상품을 담아주세요." });
      }
      
      res.status(201).json({ message: "장바구니에 담았습니다." });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };
}

module.exports = ProductController;
