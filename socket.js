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
		const enterUser = await room.findOne({
			where: {user_key: user_key}
		})
		console.log('찾은 유저' + enterUser);
		if(!enterUser){
			try{
				enterUser = await room.create({user_key: user_key})
			}catch(e){
				console.log(e)
			}
		}
		console.log('유저 생성' + enterUser)
		socket.join(enterUser.room_key);
	})

	socket.on('chat_message', async (data) =>{
		let { message, user_key } = data;
		const enterUser = await room.findOne({
			where: {user_key: user_key}
		})
		const newChat = await chat.create({room_key: enterUser.room_key, chat_person: user_key, message: message})
		io.to(enterUser.room_key).emit('message', newChat)
	})

	socket.on('send_msg', function(data){
		console.log(data);
	})

	socket.on("disconnect", () => {
    console.log(socket.id, "연결이 끊어졌어요!");
  });
})


