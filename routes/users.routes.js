const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const ProductRepository = require("../repositories/products.repository");
const productRepository = new ProductRepository();

router.use(express.urlencoded({ extended: true }));

const UsersController = require("../controllers/users.controller");
const ChatRepository = require("../repositories/chats.repository");
const usersController = new UsersController();
const chatRepository = new ChatRepository();

router.post("/signup", usersController.signUpUser);
router.post("/emailCheck", usersController.checkEmail);
router.post("/signin", usersController.signInUser);

router.get("/signin", (req, res) => {
  res.render("signin", { user: null }); //랜더 될 'signin'은 view안의 ejs 파일명과 일치해야함
});

router.get("/signup", (req, res) => {
  res.render("signup", { user: null });
});

router.get("/cart", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  const room = await chatRepository.findAllRoom()
  const chat = await chatRepository.findAllChat(user?.user_email);
  const category = await productRepository.findAllCategory();
  res.render("cart", { user: user, room: room, chat: chat, category: category });
})

router.get("/logout", authMiddleware, (req, res) => {
  res.cookie("accessToken", '');
  res.cookie("refreshToken", '');
  console.log("res.cookie : " + res.cookie);
  res.render("home", { user: null, room: null, chat: null });
});

module.exports = router;
