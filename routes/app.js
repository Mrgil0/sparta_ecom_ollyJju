const express = require('express')
const {Server} = require("http");
const cookies = require("cookie-parser");

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

module.exports = http;