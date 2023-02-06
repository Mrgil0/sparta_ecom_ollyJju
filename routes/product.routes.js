const express = require("express");
const router = express();
const authMiddleware = require("../middlewares/auth.middleware");

const ProductController = require("../controllers/products.controller");
const productController = new ProductController();

router.get("/index", productController.showAllProduct);
router.get("/index/:productId", authMiddleware, productController.findOneProduct);
router.post("/index/cart/:productId", authMiddleware, productController.productAddCart);

module.exports = router;
