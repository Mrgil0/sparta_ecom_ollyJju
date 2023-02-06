const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const ChatRepository = require('../repositories/chats.repository');
const ProductController = require("../controllers/products.controller");
const productController = new ProductController();

//변정민 page


router.get('/product_detail', authMiddleware, async (req, res) => {
  const chatRepository = new ChatRepository();
  const user = res.locals.user;
  const room = await chatRepository.findAllRoom()
  const chat = await chatRepository.findAllChat(user.user_email);
  res.render("product_detail", { user: user, room: room, chat: chat});
})

//

//이호균 page
// router.get("/cartcart", authMiddleware, async (req, res) => {
//   const currentUser = res.locals.user

//   if (!currentUser) {
//     return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
//   }
  
//   res.render("./Hogyun");
// });

const { user, Product, cart } = require('../models')
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
  const user_email = currentUser.user_email
  const {addProductId} = req.body

  console.log(addProductId)
  
  try {
    for( let purchaseProduct of addProductId) {
      await cart.destroy({ where: { product_idx: purchaseProduct, user_email }  })
    }
    
    res.status(200).json({ message: '구입 완료' })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})


module.exports = router;
