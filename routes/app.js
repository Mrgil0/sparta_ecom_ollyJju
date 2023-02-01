const express = require("express");
const { Server } = require("http");
const cookies = require("cookie-parser");
const app = express();
const http = Server(app);
const router = require('./')


/* middleware */
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use('/api', router)


/* ejs */
app.set("view engine", "ejs");
app.set("views", "./static/view");



app.get("/", (req, res) => {
  res.send("HiHi");
});

module.exports = http;
