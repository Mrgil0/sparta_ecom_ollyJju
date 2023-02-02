const express = require("express");
const router = express();
const { Item } = require("../models");


router.post("/product", async (req, res) => {
  const { productImage, productName, productInfo, price, category } = req.body;
  await Item.create({
    productImage,
    productName,
    productInfo,
    price,
    category,
  });

  res.send({ productImage, productName, productInfo, price, category });
});

module.exports = router;
