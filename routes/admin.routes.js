const express = require("express");
const router = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authmiddleware = require("../middlewares/auth.middleware");

const { Product } = require("../models");

const AdminConteroller = require("../controllers/admin.controller");
const adminConteroller = new AdminConteroller();

/* multer */
try {
  fs.readdirSync("./static/images");
} catch (error) {
  console.error("not exist directory.");
  fs.mkdirSync("./static/images");
}

const upload = multer({
  // 파일 저장 위치 (disk , memory 선택)
  storage: multer.diskStorage({
    destination: function (req, file, done) {
      done(null, "images/");
    },
    filename: function (req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // 파일 허용 사이즈 (5 MB)
  limits: { fileSize: 5 * 1024 * 1024 },
});
/*       */

router.post(
  "/product",
  upload.single("productImage"),
  authmiddleware,
  adminConteroller.createProduct
);
router.delete("/product/:productId", adminConteroller.deleteProduct);

router.patch("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  const { productName, productInfo, price } = req.body;

  const data = await Product.update(
    { productName, productInfo, price },
    { where: { id: productId } }
  );
  res.status(200).json({ message: data });
});

module.exports = router;
