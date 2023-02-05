const { chat : Chat } = require("../models");
const { room : Room } = require("../models");

class ChatRepository {
	findAllRoom = async () =>{
		try{
			const room = await Room.findAll();
			return room;
		}catch(e){
			return null;
		}
	}
	findAllChat = async (user_email) =>{
		try{
			const room = await Room.findOne({
				where: { user_key: user_email}
			})
			const chat = await Chat.findAll({
				where: {room_key : room.room_key}
			});
			return chat;
		}catch(e){
			return {};
		}
	}
	findUserChat = async (user_email) =>{
		const chat = await Chat.findAll({
			where: {chat_person: user_email}
		})
		return chat;
	}
}


module.exports = ChatRepository;