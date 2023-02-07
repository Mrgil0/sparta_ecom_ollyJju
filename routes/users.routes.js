const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const ProductRepository = require("../repositories/products.repository");
const productRepository = new ProductRepository();

router.use(express.urlencoded({ extended: true }));

const UsersController = require("../controllers/users.controller");
const ChatRepository = require("../repositories/chats.repository");
const usersController = new UsersController();
const chatRepository = new ChatRepository();

router.post("/signup", usersController.signUpUser);
router.post("/emailCheck", usersController.checkEmail);
router.post("/signin", usersController.signInUser);

router.get("/signin", (req, res) => {
  res.render("signin", { user: null }); //랜더 될 'signin'은 view안의 ejs 파일명과 일치해야함
});

router.get("/signup", (req, res) => {
  res.render("signup", { user: null });
});

router.get("/cart", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  const room = await chatRepository.findAllRoom()
  const chat = await chatRepository.findAllChat(user?.user_email);
  const category = await productRepository.findAllCategory();
  res.render("cart", { user: user, room: room, chat: chat, category: category });
})

router.get("/logout", authMiddleware, async (req, res) => {
  res.cookie("accessToken", '');
  res.cookie("refreshToken", '');
  console.log("res.cookie : " + res.cookie);
  const todaypick = await productRepository.findTodayPick();
  res.render("home", { user: null, room: null, chat: null, todaypick: todaypick });
});

//이호균 page
const { user, Product, cart, order, order_detail } = require('../models');

// ●●●●●●●●●●●●●●●●●●● 마이페이지 조회 ●●●●●●●●●●●●●●●●●●●
router.get('/mypage', authMiddleware, async (req, res) => {
  const currentUser = res.locals.user
  const userInfo = await user.findByPk(currentUser.user_idx)
  const userIdx = userInfo.user_idx
  console.log(userIdx)

  const getOrderIdx = await order.findAll({ where: { "user_idx": userIdx }
  })
  console.log(getOrderIdx[0].order_idx)
  
  const orderIdx = []
  for (let i = 0; i < getOrderIdx.length; i++) {
    orderIdx.push(getOrderIdx[i].order_idx)
  }
  console.log(orderIdx)

  // const getOrderInfo = []
  // for (let i = 0; i < orderIdx.length; i++) {
  // getOrderInfo.push(await order_detail.findAll({ where: {"order_idx": orderIdx[i]}}))
  // }
  // console.log(getOrderInfo[0].product_idx)


  if (!currentUser) {
    return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
  }

  try {
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
    await order.create({user_idx, order_address, order_status, receiver_name, receiver_phone})
    
    const orderDB = await order.findAll({ order: [["order_idx", "desc"]], limit: 1 })
    const orderKey = orderDB[0].order_idx
   
    for (let i = 0; i < addProductId.length; i++) {
      await order_detail.create({ "order_idx":orderKey, "product_idx": addProductId[i], "order_count": Number(sendCount[i])})
    }
    
    res.status(200).json({ message: '구입 목록 추가!'})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message})
  }
  
})

module.exports = router;
