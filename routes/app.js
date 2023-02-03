const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(3001, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
		transports: ['websocket', 'polling'],
		credentials: true
  },
	allowEIO3: true
});
const cookies = require("cookie-parser");
const cors = require("cors");

/* router URL */
const user = require("./users.routes");
const product = require("./product.routes");
const page = require("./pages.routes");
const admin = require("./admin.routes");
// const my_pageRouter = require('./my_page')

/* ejs */
app.use(express.static("static"));
app.set("view engine", "ejs");
app.set("views", "./static/view");

/* middleware */
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())


/* router */
app.use("/users", [user]);
app.use("/product", [product]);
app.use("/page", [page]);
app.use("/admin", [admin]);
// app.use('/mypage', my_pageRouter)

/* socket */
io.on("connection", (socket) =>{
	const { url } = socket.request;
	console.log(`소켓 연결됨: ${url}`)

	socket.on("loginEvent", (text) => console.log(text))
	socket.on("disconnect", () => {
    console.log(socket.id, "연결이 끊어졌어요!");
  });
})

//

module.exports = server;
