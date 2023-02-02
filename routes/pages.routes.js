const express = require("express");
const router = express.Router();

//길재형 page
router.get('/signin', (req, res) => {
	res.render('signin', {user: null})
});

router.get('/signup', (req, res) => {
	res.render('signup', {user: null})
});
//

//변정민 page

//

//이호균 page
const { User, /*Items*/ } = require('../models') // User 테이블 연결
const authMiddleware = require('../middlewares/auth.middleware') // 미들웨어 연결

router.get('/', /*authMiddleware,*/ async (req, res) => {
  const {user} = res.locals // 로그인된 유저를 가져옵니다.

  // res.cookie('cart','고양이 후드') // 테스트
  // console.log(req.cookies) // 테스트

  try {
    // 유저의 user_idx를 기준으로 정보 목록을 가져옵니다.
    const userInfo = await User.findByPk(1/*user.user_idx*/)
    
    // 장바구니 정보 목록을 가져옵니다. (유저의 쿠키에서 장바구니 정보를 가져와야함)
    const userProduct = !req.cookies.cart ? '장바구니가 비었습니다.' : req.cookies.cart
    
    // ejs로 정보를 보냅니다.
    res.render('my_page', { info: { userInfo }, product: { userProduct } })

    // 유저 정보가 없으면 로그인 메세지를 보냅니다.
    if (!userInfo) {
      return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
     }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
//

//이설인 page

//

module.exports = router;