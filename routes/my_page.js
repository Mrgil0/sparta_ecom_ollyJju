const express = require('express')
const router = express.Router()
const { Hogyuns, Items } = require('../models') // User 모델 연결
const authMiddleware = require('../middleware/auth')

router.get('/', /*authMiddleware,*/ async (req, res) => {
  const {currentUser} = res.locals
  
  try {
    // 유저 정보와 장바구니를 가져옵니다.
    const userInfo = await Hogyuns.findByPk(1/*currentUser.user_idx*/)
    const userProduct = await Items.findByPk(2)
    console.log(userProduct)
    res.render('my_page', { info: { userInfo }, product: { userProduct } })
    if (!userInfo) {
     return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
    }
    if (!userProduct) {
      res.json({ message: '장바구니가 비어있습니다.'})
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


module.exports = router