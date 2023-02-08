require('dotenv').config();
const { room } = require("./models");
const { chat } = require("./models");

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

	socket.on("join_room", async(data) =>{
		const {user_key} = data
		
		let enterUser = await room.findOne({
			where: {user_key: user_key}
		})
		if(!enterUser){
			enterUser = await room.create({user_key: user_key})
		} 
		socket.join(enterUser.room_key);
	})
	socket.on('chat_message', async (data) =>{
		let { message, user_key, room_key } = data;
		let newChat = []
		if(user_key === 'admin@admin.com'){
			newChat = await chat.create({room_key: Number(room_key), chat_person: user_key, message: message, check:0})
		} else{
			const enterUser = await room.findOne({
				where: {user_key: user_key}
			})
			newChat = await chat.create({room_key: enterUser.room_key, chat_person: user_key, message: message, check:0})
		}
		io.in(newChat.room_key).emit('message', newChat)
	})

	socket.on("disconnect", () => {
    console.log(socket.id, "연결이 끊어졌어요!");
  });
})


