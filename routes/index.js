express = require("express");
const router = express();

productRouter = require("./product_router.js");

router.use("/page", productRouter);

module.exports = router;
