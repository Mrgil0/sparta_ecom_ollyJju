const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = (req, res, next) => {
  let tokenObject = {}
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) next();
  if (!accessToken) next();

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

  const { userId } = getAccessTokenPayload(accessToken);
  try {
    user.findOne({
      attributes: ['userIdx', 'userId', 'phone', 'category', 'point'],
      where: {userId: userId}
    }).then((loginUser) => {
      res.locals.user = loginUser;
      next();
    });
  } catch (err) {
    console.log(err);
    next();
  }
};

// Access Token을 검증합니다.
function validateAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, 'sparta-secret-key'); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, 'sparta-secret-key'); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
  try {
    const payload = jwt.verify(accessToken, 'sparta-secret-key'); // JWT에서 Payload를 가져옵니다.
    return payload;
  } catch (error) {
    return null;
  }
}