const express = require("express");
const { Server } = require("http");
const cookies = require("cookie-parser");
const app = express();
const http = Server(app);

/* router URL */
const user = require("./users.routes");
const product = require("./product.routes");
const page = require("./pages.routes");
const addproduct = require("./addProduct.routes");

/* ejs */
app.use(express.static("static"));
app.set("view engine", "ejs");
app.set("views", "./static/view");

/* middleware */
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* router */
app.use("/users", [user]);
app.use("/product", [product]);
app.use("/page", [page]);
app.use("/add", [addproduct]);
module.exports = http;
