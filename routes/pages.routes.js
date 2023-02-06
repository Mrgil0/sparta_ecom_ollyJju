const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const ProductController = require("../controllers/products.controller");
const productController = new ProductController();

//이호균 page
// router.get("/cartcart", authMiddleware, async (req, res) => {
//   const currentUser = res.locals.user

//   if (!currentUser) {
//     return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
//   }
  
//   res.render("./Hogyun");
// });

const { user, Product, cart, order } = require('../models')
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
// ●●●●●●●●●●●●●●●●●●● 장바구니 구입 ●●●●●●●●●●●●●●●●●●●
router.patch('/cartpagePro',authMiddleware, async (req, res) => {
  const currentUser = res.locals.user
  console.log('커런트 상태', currentUser)
  const {user_idx, user_email, user_name, user_address} = currentUser
  const {addProductId, sumTotal} = req.body
  const savePoint = Number(sumTotal) * 0.05

  try {
    for( let purchaseProduct of addProductId) {
      await cart.destroy({ where: { product_idx: purchaseProduct, user_email }  })
    }

    const userInfo = await user.findByPk(user_idx)
    const currentPoint = userInfo.user_point 
    
    const totalPoint = currentPoint + savePoint
    
    userInfo.user_point = totalPoint
    await userInfo.save()

    const order_address = user_address
    const order_status = '배송 준비 중'
    const receiver_name = user_name

    await order.create({user_idx, order_address, order_status, receiver_name, receiver_phone})

  
    res.status(200).json({ message: '구입 완료' })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})


module.exports = router;
