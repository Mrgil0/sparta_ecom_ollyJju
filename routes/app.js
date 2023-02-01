const express = require('express')
const {Server} = require("http");
const cookies = require("cookie-parser");
const user = require("./users.routes")

const app = express()
app.use(cookies()); 
app.use(express.json());
app.use(express.urlencoded( {extended : true } ))
app.use(express.static("static"));
app.set('view engine', 'ejs');
app.set('views', './static/view');
const http = Server(app);

app.get('/', (req, res) => {
  res.send('HiHi')
})

app.use("/users", [user]);

module.exports = http;