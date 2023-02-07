const express = require("express");
const router = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authmiddleware = require("../middlewares/auth.middleware");
const ChatRepository = require('../repositories/chats.repository');


const AdminConteroller = require("../controllers/admin.controller");
const adminConteroller = new AdminConteroller();
const chatRepository = new ChatRepository();

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

router.get("/users", authmiddleware, adminConteroller.showAllUser);
router.delete("/users/:user_idx", authmiddleware, adminConteroller.deleteUser);
router.get("/product", authmiddleware, adminConteroller.showAllProduct);
router.post("/product", upload.single("productImage"), authmiddleware, adminConteroller.createProduct);
router.patch("/product/:productId", authmiddleware, adminConteroller.updateProduct);
router.delete("/product/:productId", authmiddleware, adminConteroller.deleteProduct);



router.post("/chat", async (req, res) => {
  const { email_give } = req.body;

  const chat = await chatRepository.findUserChat(email_give);
  res.status(200).json({ message: chat });
})

module.exports = router;
