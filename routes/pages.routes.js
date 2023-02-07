const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const ProductController = require("../controllers/products.controller");
const productController = new ProductController();

//이호균 page
const { user, Product, cart, order, order_detail } = require('../models');
// const ChatRepository = require("../repositories/chats.repository");
// ●●●●●●●●●●●●●●●●●●● 마이페이지 조회 ●●●●●●●●●●●●●●●●●●●
router.get('/mypage', authMiddleware, async (req, res) => {
  const currentUser = res.locals.user
  // // const chatRepository = new ChatRepository(); // ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
  // const room = await chatRepository.findAllRoom()
  // const chat = await chatRepository.findAllChat(user?.user_email);
  if (!currentUser) {
    return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
  }

  try {
    const userInfo = await user.findByPk(currentUser.user_idx) 
    res.render('my_page', { info: { userInfo } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ●●●●●●●●●●●●●●●●●●● 마이페이지 회원정보 수정 ●●●●●●●●●●●●●●●●●●● 
router.patch('/mypage', authMiddleware, async (req, res) => {
  const currentUser = res.locals.user 
  const { user_password, user_address, user_phone } = req.body
  
  const userInfo = await user.findByPk(currentUser.user_idx)
  
  if (userInfo) {
    if (user_password) {
      userInfo.user_password = user_password
    }
    if (user_address) {
      userInfo.user_address = user_address
    }
    if (user_phone) {
      userInfo.user_phone = user_phone
    }
  }

  try {
    await userInfo.save()
    res.json({message: '수정 완료'})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ●●●●●●●●●●●●●●●●●●● 장바구니 페이지 ●●●●●●●●●●●●●●●●●●●
router.get('/cartpagePro', authMiddleware, async (req, res) => {
  const currentUser = res.locals.user
  const user_email = currentUser.user_email
  const data = await cart.findAll({ where: { user_email },
    include: { model: Product, attributes: ['productImage','productName', 'price'] } 
  })

  if (!currentUser) {
    return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
  }

  try {
    res.status(200).json({ "data": data })
    console.log('전송!')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ●●●●●●●●●●●●●●●●●●● 장바구니 삭제 ●●●●●●●●●●●●●●●●●●●
router.delete('/cartpagePro',authMiddleware, async (req, res) => {
  const currentUser = res.locals.user
  const user_email = currentUser.user_email
  const {proId} = req.body
  
  try {
    await cart.destroy({ where: { product_idx: proId, user_email }  })
    res.status(200).json({ message: '삭제 완료' })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})
// ●●●●●●●●●●●●●●●●●●● 장바구니 구입기능 ●●●●●●●●●●●●●●●●●●●
router.patch('/cartpagePro',authMiddleware, async (req, res) => {
  const currentUser = res.locals.user
  const {user_idx, user_email, user_name, user_phone, user_address} = currentUser
  const {addProductId, sumTotal} = req.body
  const savePoint = Number(sumTotal) * 0.05

  try {
    for(let purchaseProduct of addProductId) {
      await cart.destroy({ where: { product_idx: purchaseProduct, user_email }  })
    }
    const userInfo = await user.findByPk(user_idx)
    const currentPoint = userInfo.user_point 
    const totalPoint = currentPoint + savePoint

    userInfo.user_point = totalPoint
    
    await userInfo.save()
    console.log('장바구니는 성공!')
    res.status(200).json({ message: '구입 완료' })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})
// ●●●●●●●●●●●●●●●●●●● 구입한 상품 DB에 저장 ●●●●●●●●●●●●●●●●●●●
router.post('/cartpagePro', authMiddleware, async(req, res) => {
  const currentUser = res.locals.user
  const {user_idx, user_name, user_phone, user_address} = currentUser
  
  const order_address = user_address
  const order_status = '배송 준비 중'
  const receiver_name = user_name
  const receiver_phone = user_phone
  console.log(user_idx, order_address, order_status, receiver_name, receiver_phone)
  const {addProductId, sendCount} = req.body
  console.log('프로덕트 아이디:', addProductId)
  console.log('가져온 수량:', sendCount)

  try {
    console.log('order DB에 정보 넣기 시작')
    await order.create({user_idx, order_address, order_status, receiver_name, receiver_phone})
    console.log('이 문구가 뜨면 정보 넣기 성공')
    const orderDB = await order.findAll({ order: [["order_idx", "desc"]], limit: 1 })
    const orderKey = orderDB[0].order_idx
    console.log('나오면:',orderKey)
    console.log('준비시작!')
    console.log(addProductId)
    console.log(sendCount)
    for (let i = 0; i < addProductId.length; i++) {
      await order_detail.create({ "order_idx":orderKey, "product_idx": addProductId[i], "order_count": sendCount[i]})
    }
    console.log('준비끝!')
    res.status(200).json({ message: '구입 목록 추가!'})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message})
  }
  
})

module.exports = router;
