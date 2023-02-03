const express = require("express");
const router = express.Router();

//길재형 page
router.get('/signin', (req, res) => {
	res.render('signin', {user: null}) //랜더 될 'signin'은 view안의 ejs 파일명과 일치해야함
});

router.get('/signup', (req, res) => {
	res.render('signup', {user: null})
});
//

//변정민 page

//

//이호균 page
const { user, /*Items*/ } = require('../models') // User 테이블 연결 // ※※※※※※※※※※모델명 변경예정※※※※※※※※※※※※※※
const authMiddleware = require('../middlewares/auth.middleware') // 미들웨어 연결

// 마이페이지 조회
router.get('/mypage', /*authMiddleware,*/ async (req, res) => {
  const {loginUser} = res.locals // 로그인된 유저를 가져옵니다.

  res.cookie('cart','고양이 후드') // 테스트
  res.cookie('cart2','멍멍이 후드') // 테스트
  res.cookie('cart3','알파카 간식') // 테스트
  // console.log(req.cookies) // 테스트

  try {
    // 유저의 user_idx를 기준으로 정보 목록을 가져옵니다.
    const userInfo = await user.findByPk(1/*loginuser.user_idx*/) // ※※※※※※※※※※모델명 변경예정※※※※※※※※※※※※※※
    
    // 장바구니 정보 목록을 가져옵니다. (유저의 쿠키에서 장바구니 정보를 가져와야함)
    // const userProduct = !req.cookies.cart ? '장바구니가 비었습니다.' : req.cookies.cart
    
    const cartProduct = req.cookies.cart
    const cartEmpty = '장바구니가 비었습니다.'

    // ejs로 정보를 보냅니다.
    res.render('my_page', { info: { userInfo }, cart: { cartProduct, cartEmpty } })

    // 유저 정보가 없으면 로그인 메세지를 보냅니다.
    if (!userInfo) {
      return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
     }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// 마이페이지 회원정보(비밀번호, 주소) 수정 
router.patch('/mypage', /*authMiddleware,*/async (req, res) => {
  const {loginUser} = res.locals // 로그인된 유저를 가져옵니다.
  
  const { user_password, user_address } = req.body
  console.log(user_password)
  console.log(user_address)
  const userInfo = await user.findByPk(1/*loginuser.user_idx*/) // ※※※※※※※※※※모델명 변경예정※※※※※※※※※※※※※※
  console.log(userInfo)  
  if (userInfo) {
    if (user_password) {
      userInfo.user_password = user_password
    }
    if (user_address) {
      userInfo.user_address = user_address
    }
  }

  try {
    await userInfo.save()
    res.json({message: '수정 완료'})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// router.delete('/page/mypage', async (req, res) => {
//   console.log({data})
//   res.json({ message: '연결 완료' })
// })

//

//이설인 page
router.get('/home', (req, res) => {
	res.render('home')
});
//

module.exports = router;