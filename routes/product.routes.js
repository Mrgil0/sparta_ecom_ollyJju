const express = require("express");
const router = express();

const ProductController = require("../controllers/products.controller");
const productController = new ProductController();

router.get("/index", productController.showAllProduct);
router.get("/index/:productId", productController.findOneProduct);
router.post("/index/cart/:productId", productController.productAddCart);

module.exports = router;
