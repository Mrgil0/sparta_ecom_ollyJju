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
  const todaypick = await productRepository.findTodayPick();
  const category = await productRepository.findAllCategory();
  res.render("home", { user: null, room: null, chat: null, todaypick: todaypick, category: category });
});

//이호균 page
const { user, Product, cart, order, order_detail, sequelize } = require('../models');

// ●●●●●●●●●●●●●●●●●●● 마이페이지 조회 ●●●●●●●●●●●●●●●●●●●
router.get('/mypage', authMiddleware, async (req, res) => {
  const currentUser = res.locals.user
  const userInfo = await user.findByPk(currentUser.user_idx)
  const userIdx = userInfo.user_idx

  const purchaseList = await sequelize.query(
    `SELECT oi.order_idx, od.product_idx, od.order_count, pd.productName
     FROM orders oi
     INNER JOIN order_details od ON oi.order_idx = od.order_idx
     INNER JOIN Products pd on od.product_idx = pd.id
     WHERE oi.user_idx = ${userIdx}`
  )

  const getOrderInfo = purchaseList[0]

  if (!currentUser) {
    return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
  }

  try {
    res.render('my_page', { info: { userInfo }, list: { getOrderInfo } })
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
  const {user_idx, user_email} = currentUser
  const {addProductId, sumTotal} = req.body
  if(currentUser.user_point < sumTotal){
    res.status(200).json({ message: '포인트가 부족합니다.' })
  }
  try {
    for(let purchaseProduct of addProductId) {
      await cart.destroy({ where: { product_idx: purchaseProduct, user_email }  })
    }
    const userInfo = await user.findByPk(user_idx)
    const currentPoint = userInfo.user_point 
    const totalPoint = currentPoint - sumTotal

    userInfo.user_point = totalPoint
    
    await userInfo.save()
    res.status(200).json({ message: '구입이 완료되었습니다.' })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})
// ●●●●●●●●●●●●●●●●●●● 구입한 상품 DB에 저장 ●●●●●●●●●●●●●●●●●●●
router.post('/cartpagePro', authMiddleware, async(req, res) => {
  const currentUser = res.locals.user
  const {user_idx} = currentUser
  const {user_name, user_phone, user_address, addProductId, sendCount} = req.body;

  const order_status = '배송 준비 중'

  try {
    await order.create({user_idx, order_address: user_address, order_status, receiver_name: user_name, receiver_phone: user_phone})
    
    const orderDB = await order.findAll({ order: [["order_idx", "desc"]], limit: 1 })
    const orderKey = orderDB[0].order_idx
  
    for (let i = 0; i < addProductId.length; i++) {
      await order_detail.create({ "order_idx":orderKey, "product_idx": addProductId[i], "order_count": Number(sendCount[i])})
    }
    
    res.status(200).json({ message: true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: false})
  }
  
})

module.exports = router;
