const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");


router.use(express.urlencoded({ extended: true }));

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/signup', usersController.signUpUser);
router.post('/emailCheck', usersController.checkEmail);
router.post('/signin', usersController.signInUser);

router.get("/signin", (req, res) => {
  res.render("signin", { user: null }); //랜더 될 'signin'은 view안의 ejs 파일명과 일치해야함
});

router.get("/signup", (req, res) => {
  res.render("signup", { user: null });
});

router.get("/logout", authMiddleware, (req, res) => {
	res.cookie('accessToken', null);
  res.cookie('refreshToken', null);
  res.render("home", { user: null, room : null, chat: null });
});

module.exports = router;