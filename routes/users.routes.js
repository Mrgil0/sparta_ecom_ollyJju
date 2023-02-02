const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/signup', usersController.registerUser);
router.get('/emailCheck', usersController.checkEmail);
router.post('/signin', usersController.loginUser);

module.exports = router;