const express = require("express");
const router = express();
const authMiddleware = require("../middlewares/auth.middleware");

const ProductController = require("../controllers/products.controller");
const productController = new ProductController();

router.get("/index", productController.showNewProduct);
router.get("/index/best", productController.showBestProduct);
router.post("/detail/:productId", authMiddleware, async (req,res) => {
    const { productId } = req.params;
    const dataa = await productController.findOneProduct(productId)
    const user = res.locals.user;
    console.log(dataa)
    console.log("hi")
    res.render("product_detail", { user: user, dataa: dataa});
});

router.post("/index/cart/:productId", authMiddleware, productController.productAddCart);
  

module.exports = router;
