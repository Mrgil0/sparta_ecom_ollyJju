const express = require("express");
const router = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authmiddleware = require("../middlewares/auth.middleware");
const ChatRepository = require('../repositories/chats.repository');
const {user} = require("../models")


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

router.post("/product", upload.single("productImage"), authmiddleware, adminConteroller.createProduct);
router.patch("/product/:productId", authmiddleware, adminConteroller.updateProduct);
router.delete("/product/:productId", authmiddleware, adminConteroller.deleteProduct);

// admin 유저 관리자 페이지 수정해야함
router.get("/users", authmiddleware, async (req, res) => {
  const user_type = res.locals.user.user_type;
  console.log(user_type)
  if ( user_type === "admin") {
    const users = await user.findAll({
      where: {user_type: "guest"}
    })

    res.status(200).json({users});
  } else {
    res.status(403).json({message: "관리자만 접근 가능한 페이지 입니다."});
  }
});



router.post("/chat", async (req, res) => {
  const { email_give } = req.body;

  const chat = await chatRepository.findUserChat(email_give);
  
  res.status(200).json({ message: chat });
})

module.exports = router;
