const UserRepository = require('../repositories/users.repository');

class UserService {
    userRepository = new UserRepository();
    
    findUser = async (id, password) => {
        const users = await this.userRepository.findUser(id, password);

        return users
    }

    findUserbyId = async (id) => {
        const users = await this.userRepository.findUserbyId(id);

        return users;
    }

    createUser = async (id, password, phone, category) => {
        const users = await this.userRepository.createUser(id, password, phone, category);

        return users;
    }
    decreasePoint = async (userIdx, point) => {
        await this.userRepository.decreasePoint(userIdx, point);
    }
    increasePoint = async (userId, point) => {
        await this.userRepository.increasePoint(userId, point);
    }
}

module.exports = UserService;