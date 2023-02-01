const { user : Users } = require('../models');

class UserRepository {
    findUser = async (id, password) => {
        const user = await Users.findOne({
            where: { userId: id, password: password}
        });

        return user;
    }
    findUserbyId = async (id) => {
        try{
            const user = await Users.findAll({
                where: {
                    userId : id,
                }
            })
            return user;
        }
        catch(err){
            console.log('찾기 실패')
            return false;
        }
    }
    createUser = async (id, password, phone, category) => {
        let point = 0;
        if(category === '손님'){
            point = 1000000
        }
        try{
            await Users.create({userId:id, password, phone, category, point: point})
        }catch(err){
            console.log('##유저 가입 에러' + err);
            return false;
        }
        return true;
    }
    decreasePoint = async (idx, point) => {
        await Users.update({userIdx: idx, point: point}, {where: {userIdx: Number(idx)}});

        return true;
    }
    increasePoint = async (id, point) => {
        await Users.update({userId: id, point: point}, {where: {userId: id}});

        return true;
    }
}

module.exports = UserRepository;