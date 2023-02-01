const express = require("express");
const router = express();

const {Order} = require('../models')


router.post('/page/index/:productId', async (req,res) => {
    const {productId} = req.params
    const {price, count} = req.body;
    const userId = 1
    
    if (count === undefined) {
        res.status(412).json({message: "수량을 정해주세요"})
    } 

    await Order.create(productId, price, count, userId)


    res.status(200).json({message: "제품 구매 완료!"})
})
module.exports = router;
