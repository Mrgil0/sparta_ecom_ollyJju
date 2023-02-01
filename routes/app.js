const express = require("express");
const { Server } = require("http");
const cookies = require("cookie-parser");
const app = express();
const http = Server(app);

/* router URL */
const user = require("./users.routes");
const product = require("./product.routes");

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
app.use("/api", [product]);

module.exports = http;
