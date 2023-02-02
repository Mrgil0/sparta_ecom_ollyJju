class UserRepository {
    constructor(UserModel) {
        this.users = UserModel;
    }
    findUser = async (id, password) => {
        const user = await users.findOne({
            where: { userId: id, password: password}
        });

        return user;
    }
    findUserbyEmail = async (email) => {
        try{
            const user = await users.findAll({
                where: {
                    user_email : email,
                }
            })
            return user;
        }
        catch(err){
            console.log('찾기 실패')
            return false;
        }
    }
    createUser = async (user_email, user_password, user_name, user_phone, user_address) => {
        let point = 0;
        try{
            await users.create({user_email, user_password, user_name, user_phone, user_address, user_type:'guest', user_point: point})
        }catch(err){
            console.log('##유저 가입 에러' + err);
            return false;
        }
        return true;
    }
    decreasePoint = async (idx, point) => {
        await users.update({userIdx: idx, point: point}, {where: {userIdx: Number(idx)}});

        return true;
    }
    increasePoint = async (id, point) => {
        await users.update({userId: id, point: point}, {where: {userId: id}});

        return true;
    }
}

module.exports = UserRepository;