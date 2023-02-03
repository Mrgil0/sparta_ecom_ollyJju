const express = require("express");
const router = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const middleware = require('../middlewares/auth.middleware')

const AdminConteroller = require('../controllers/admin.controller');
const adminConteroller = new AdminConteroller();

/* multer */
try {
  fs.readdirSync("images");
} catch (error) {
  console.error("not exist directory.");
  fs.mkdirSync("images");
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

router.post('/', upload.single("productImage"), middleware, adminConteroller.createProduct);



module.exports = router;
