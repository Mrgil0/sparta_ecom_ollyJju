const UserRepository = require('../repositories/users.repository');
const { users } = require('../models');

class UserService {
    userRepository = new UserRepository(users);
    
    findUser = async (id, password) => {
        const users = await this.userRepository.findUser(id, password);

        return users
    }

    findUserbyEmail = async (email) => {
        const users = await this.userRepository.findUserbyEmail(email);

        return users;
    }

    createUser = async (email, password, name, phone, address) => {
        const users = await this.userRepository.createUser(email, password, name, phone, address);

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