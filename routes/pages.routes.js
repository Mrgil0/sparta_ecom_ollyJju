const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const ProductController = require("../controllers/products.controller");
const productController = new ProductController();

//이호균 page
const { user } = require('../models')
const { Product } = require('../models')

// 마이페이지 조회
router.get('/mypage', authMiddleware, productController.productMiddleware, async (req, res) => {
  const currentUser = res.locals.user
  const currentCart = res.locals.product // 가져올 장바구니 데이터
  console.log('장바구니 내용물:', currentCart)

  // const currentCart = [{productId: '30', product_quantity: '280'},{productId: '31', product_quantity: '50' }]  // 예시로 가져온 데이터
  
  let cartEmpty = ''
  let cartInfo = []
  let product_quantity = []

    if (!currentCart) {
      cartEmpty = '장바구니가 비었습니다.'
    } else {
      for (let i = 0; i < currentCart.length; i++) {
        allCart = await Product.findByPk(currentCart[i].productId)
        cartInfo.push(allCart)
        quantity= currentCart[i].product_quantity
        product_quantity.push(quantity)
      }
    }

    // if (!currentCart) {
    //   cartEmpty = '장바구니가 비었습니다.'
    // } else {
    //   cartInfo = currentCart.productId
    //   product_quantity = currentCart.product_quantity
    // }

    // console.log(cartInfo) // 33
    // console.log(product_quantity) // 5000
  
  try {
    const userInfo = await user.findByPk(currentUser.user_idx) 
    res.render('my_page', { info: { userInfo }, cart: { cartInfo, product_quantity, cartEmpty } })
    // res.render('cart_page', { cart: { productName, product_quantity } })
    
    if (!userInfo) {
      return res.status(412).json({ message: '로그인이 필요한 서비스입니다.'})
     }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// 마이페이지 회원정보(비밀번호, 주소) 수정 
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

router.delete('/mypage', async (req, res) => {
  const cartDel = req.body
  console.log(cartDel)
  res.json({ message: '연결 완료' })
})

// //

module.exports = router;
