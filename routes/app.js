const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
require("dotenv").config();
const env = process.env;
const authMiddleware = require("../middlewares/auth.middleware");
const ChatRepository = require("../repositories/chats.repository");
const chatRepository = new ChatRepository();
const path = require("path")

const cookies = require("cookie-parser");
const cors = require("cors");

/* router URL */
const user = require("./users.routes");
const product = require("./product.routes");
const page = require("./pages.routes");
const admin = require("./admin.routes");
// const my_pageRouter = require('./my_page')

/* ejs */
app.use(express.static(path.join(__dirname, "../static")));
app.use("/images", express.static("images"));
app.set("view engine", "ejs");
app.set("views", "./static/views");

console.log(__dirname)
/* middleware */
app.use(cookies());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/home", authMiddleware, async (req, res) => {
  let {page} = Number(req.body);
  if(page === undefined){
    page = 1
  }
  const user = await res.locals.user;
  const room = await chatRepository.findAllRoom()
  const chat = await chatRepository.findAllChat(user?.user_email);
  res.render("home", { user: user, room: room, chat: chat });
});

app.get("/manage_product", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  res.render("manage_product", {user : user});
});

app.get("/manage_user", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  res.render("manage_user", {user : user});
});

/* router */
app.use("/users", [user]);
app.use("/product", [product]);
app.use("/page", [page]);
app.use("/admin", [admin]);
// app.use('/mypage', my_pageRouter)

/* socket */
// io.on("connection", (socket) =>{
// 	const { url } = socket.request;
// 	console.log(`소켓 연결됨: ${url}`)

// 	socket.on("loginEvent", (text) => console.log(text))
// 	socket.on("disconnect", () => {
//     console.log(socket.id, "연결이 끊어졌어요!");
//   });
// })

//

module.exports = server;
