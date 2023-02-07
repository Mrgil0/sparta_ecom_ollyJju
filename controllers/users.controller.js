const UserService = require("../services/users.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;

class UsersController {
  userService = new UserService();

  generateRandom = function (min, max) {
    const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
  };

  signInUser = async (req, res, next) => {
    const { email_give, pw_give } = req.body;

    const user = await this.userService.findUser(email_give, pw_give);
    if (!user) {
      return res.send({ msg: false });
    }
    const accessToken = jwt.sign(
      { user_email: user.user_email },
      env.secret_key,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign({}, env.secret_key, { expiresIn: "7d" });

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    return res.send({ msg: true });
  };

  checkEmail = async (req, res, next) => {
    const { email_give } = req.body;
    const findUser = await this.userService.findUserbyEmail(email_give);
    if (findUser.length > 0) {
      return res.send({ msg: true });
    }
    return res.send({ msg: false });
  };

  signUpUser = async (req, res, next) => {
    const { email_give, pw_give, name_give, phone_give, address_give } =
      req.body;
    const createUser = await this.userService.createUser(
      email_give,
      pw_give,
      name_give,
      phone_give,
      address_give
    );

    if (createUser) {
      return res.status(200).send({ msg: true });
    } else {
      return res.status(400).send({ msg: false });
    }
  };
}

module.exports = UsersController;
