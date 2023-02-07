const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const path = require("path");
const cookies = require("cookie-parser");
const cors = require("cors");

const authMiddleware = require("../middlewares/auth.middleware");
const ChatRepository = require("../repositories/chats.repository");
const chatRepository = new ChatRepository();
const ProductRepository = require("../repositories/products.repository");
const productRepository = new ProductRepository();


/* router URL */
const user = require("./users.routes");
const product = require("./product.routes");
const page = require("./pages.routes");
const admin = require("./admin.routes");

/* ejs */
app.use(express.static(path.join(__dirname, "../static")));
app.use("/images", express.static("images"));
app.set("view engine", "ejs");
app.set("views", "./static/views");


/* middleware */
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* render */
app.get("/home", authMiddleware, async (req, res) => {
  const user = await res.locals.user;
  const room = await chatRepository.findAllRoom()
  const chat = await chatRepository.findAllChat(user?.user_email);
  const category = await productRepository.findAllCategory();
  const todaypick = await productRepository.findTodayPick();
  res.render("home", { user: user, room: room, chat: chat, category: category, todaypick: todaypick });
});

app.get('/product_detail', authMiddleware, async (req, res) => {
  const user = res.locals.user;
  const room = await chatRepository.findAllRoom()
  const chat = await chatRepository.findAllChat(user?.user_email);
  const category = await productRepository.findAllCategory();
  res.render("product_detail", { user: user, room: room, chat: chat, category: category});
})

app.get("/manage_product", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  const room = await chatRepository.findAllRoom()
  const chat = await chatRepository.findAllChat(user?.user_email);
  const category = await productRepository.findAllCategory();
  res.render("manage_product", { user: user, room: room, chat: chat, category: category});
});

app.get("/manage_user", authMiddleware, async (req, res) => {
  const user = res.locals.user;
  const room = await chatRepository.findAllRoom()
  const chat = await chatRepository.findAllChat(user?.user_email);
  const category = await productRepository.findAllCategory();
  res.render("manage_user", { user: user, room: room, chat: chat, category: category});
});

/* router */
app.use("/users", [user]);
app.use("/product", [product]);
app.use("/page", [page]);
app.use("/admin", [admin]);


module.exports = server;
