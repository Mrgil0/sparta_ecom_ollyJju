require('dotenv').config();
const env = process.env;
const io = require('socket.io')(env.socket_port, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
		transports: ['websocket', 'polling'],
		credentials: true
  },
	allowEIO3: true
});

io.on("connection", (socket) =>{
	const { url } = socket.request;
	console.log(`소켓 연결됨: ${url}`)

	socket.on("loginEvent", (text) => console.log(text))
	socket.on("disconnect", () => {
    console.log(socket.id, "연결이 끊어졌어요!");
  });
})


