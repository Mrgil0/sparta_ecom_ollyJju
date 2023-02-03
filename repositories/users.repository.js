const { user: Users } = require("../models");

class UserRepository {
  findUser = async (email, password) => {
    const user = await Users.findOne({
      where: { user_email: email, user_password: password },
    });

    return user;
  };
  findUserbyEmail = async (email) => {
    try {
      const user = await Users.findAll({
        where: {
          user_email: email,
        },
      });
      return user;
    } catch (err) {
      console.log("찾기 실패");
      return false;
    }
  };
  createUser = async (
    user_email,
    user_password,
    user_name,
    user_phone,
    user_address
  ) => {
    console.log(Users)
    console.log(user_email)
    let point = 0;
    try {
      await Users.create({
        user_email,
        user_password,
        user_name,
        user_address,
        user_type: "admin",
        user_phone,
        user_point: point,
      });
    } catch (err) {
      console.log("##유저 가입 에러" + err);
      return false;
    }
    return true;
  };
  decreasePoint = async (idx, point) => {
    await Users.update(
      { user_Idx: idx, point: point },
      { where: { userIdx: Number(idx) } }
    );

    return true;
  };
  increasePoint = async (idx, point) => {
    await Users.update(
      { user_Idx: idx, point: point },
      { where: { userId: id } }
    );

    return true;
  };
}

module.exports = UserRepository;
