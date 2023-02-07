const jwt = require("jsonwebtoken");
const { user } = require("../models");
require('dotenv').config();
const env = process.env;

module.exports = (req, res, next) => {
  let tokenObject = {}
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return next();
  if (!accessToken) return next();

  const isAccessTokenValidate = validateAccessToken(accessToken);
  const isRefreshTokenValidate = validateRefreshToken(refreshToken);

  if (!isRefreshTokenValidate) next();


  if (!isAccessTokenValidate) {
    const accessTokenId = tokenObject[refreshToken];
    if (!accessTokenId) next();

    const newAccessToken = createAccessToken(accessTokenId);
    res.cookie('accessToken', newAccessToken);
    return next();
  }

  const { user_email } = getAccessTokenPayload(accessToken);
  try {
    user.findOne({
      attributes: ['user_idx', 'user_email', 'user_name', 'user_address', 'user_type', 'user_phone','user_point'],
      where: {user_email: user_email},
      raw: true
    }).then((loginUser) => {
      res.locals.user = loginUser;
      next();
    });
  } catch (err) {
    res.locals.user = null;
    console.log('인증 실패 : ' + err);
    next();
  }
};

// Access Token을 검증합니다.
function validateAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, env.secret_key); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, env.secret_key); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
  try {
    const payload = jwt.verify(accessToken, env.secret_key); // JWT에서 Payload를 가져옵니다.
    return payload;
  } catch (error) {
    return null;
  }
}