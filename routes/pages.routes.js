const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const ChatRepository = require('../repositories/chats.repository');

//변정민 page
router.get("/test", async (req, res) => {
  res.render("test");
});

router.get("/admin", async (req, res) => {
  res.render("./admin/admin_page");
});

router.get("/manage_product", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  res.render("./admin/manage_product", {user : user});
});

router.get("/manage_user", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  res.render("./admin/manage_user", {user : user});
});

//

//이호균 page

router.get("/cartcart", async (req, res) => {
  res.render("./Hogyun");
});

const { user, Product, cart } = require('../models')
const ProductController = require('../controllers/products.controller')
const productController = new ProductController

// ●●●●●●●●●●●●●●●●●●● 마이페이지 조회 ●●●●●●●●●●●●●●●●●●●
router.get('/mypage', authMiddleware, productController.productMiddleware, async (req, res) => {
  // 로그인된 유저의 모든 정보를 변수에 넣는다.
  const currentUser = res.locals.user

  // // 로그인된 유저의 이메일 정보만 변수에 넣는다.
  // const user_email = currentUser.user_email

  // 로그인된 유저가 아니면 접근을 거부한다.
  if (!currentUser) {
    return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
  }

  // 로그인된 유저의 장바구니를 모두 가져온다.
  // const baseCart = await cart.findAll({ where: { user_email },
  //   include: { model: Product, attributes: ['productImage','productName', 'price'] } 
  // })

  // // 장바구니에 해당 유저가 없다면?
  // // if (!baseCart) {
  // //   alert('장바구니가 없습니다.')
  // //   return res.render('my_page', { info: { userInfo }, cart: { cartInfo, product_quantity, cartEmpty } })
  // // }

  // let productCount = []
  // let productImage = []
  // let productName = []
  // let productPrice = []

  // // 위 변수에 장바구니 정보를 배열로 넣는다.
  // for (let i = 0; i < baseCart.length; i++) {
  //   productCount.push(baseCart[i].count)
  //   productImage.push(baseCart[i].Product.productImage)
  //   productName.push(baseCart[i].Product.productName)
  //   productPrice.push(baseCart[i].Product.price)
  // }

  try {
    const userInfo = await user.findByPk(currentUser.user_idx) 
    // console('이것은:', userInfo)

    res.render('my_page', { info: { userInfo }/*, cart: { productImage, productName, productPrice, productCount }*/ })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ●●●●●●●●●●●●●●●●●●● 마이페이지 회원정보(비밀번호, 주소) 수정 ●●●●●●●●●●●●●●●●●●● 
router.patch('/mypage', authMiddleware, async (req, res) => {
  const currentUser = res.locals.user // 로그인된 유저를 가져옵니다.

  const { user_password, user_address } = req.body
  
  const userInfo = await user.findByPk(currentUser.user_idx)
  
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

// ●●●●●●●●●●●●●●●●●●● 장바구니 페이지 ●●●●●●●●●●●●●●●●●●●
router.get('/cartpagePro', authMiddleware, async (req, res) => {
  // 로그인된 유저의 모든 정보를 변수에 넣는다.
  const currentUser = res.locals.user
  // 로그인된 유저의 이메일 정보만 변수에 넣는다.
  const user_email = currentUser.user_email

  // 로그인된 유저가 아니면 접근을 거부한다.
  if (!currentUser) {
    return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
  }

  // 로그인된 유저의 장바구니를 모두 가져온다.
  const data = await cart.findAll({ where: { user_email },
    include: { model: Product, attributes: ['productImage','productName', 'price'] } 
  })
 
  try {
    res.status(200).json({ "data": data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ●●●●●●●●●●●●●●●●●●● 장바구니 삭제 ●●●●●●●●●●●●●●●●●●●
router.delete('/cartpagePro',authMiddleware, async (req, res) => {
  // 로그인된 유저의 모든 정보를 변수에 넣는다.
  const currentUser = res.locals.user
  // 로그인된 유저의 이메일 정보만 변수에 넣는다.
  const user_email = currentUser.user_email

  const {proId} = req.body
  console.log('프로아이디는:', proId)
  
  try {
    await cart.destroy({ where: { product_idx: proId, user_email }  })
    res.status(200).json({ message: '삭제 완료' })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})

module.exports = router;
