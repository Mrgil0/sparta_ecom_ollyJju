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
}


module.exports = ChatRepository;