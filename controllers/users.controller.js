const UserService = require('../services/users.service');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const env = process.env;

class UsersController{
    userService = new UserService(); 

    generateRandom = function (min, max) {
        const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
        return ranNum;
    }
    
    signInUser = async (req, res, next) => {
        const { id_give, pw_give } = req.body;

        const user = await this.userService.findUser(id_give, pw_give);
        if(!user){
            return res.send({'msg': false});
        }
        const accessToken = jwt.sign({ userEmail: user.userEmail }, env.secret - key, { expiresIn: '1d' })
        const refreshToken = jwt.sign({}, env.secret-key, {expiresIn: '7d'})

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);
        return res.send({'msg': true});
    }

    // sendEmail = async (req, res, next) => {
    //     const { email_give } = req.body;
    //     const number = generateRandom(111111,999999)

    //     const mailOptions = {
    //         from: "올리와사고싶쮸",
    //         to: email_give,
    //         subject: "[올리쮸]인증 관련 이메일 입니다",
    //         text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
    //     };

    //     const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
    //         if (error) {
    //             return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL))
    //         } else {
    //           /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
    //             return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
    //                 number: number
    //             }))
    //         }
    //         smtpTransport.close();
    //     });
    // }

    checkEmail = async (req, res, next) => {
        const { user_email } = req.params;

        const findUser = await this.userService.findUserbyEmail(user_email);
        if(findUser.length > 0){
            return res.send({'msg': true})
        }
        return res.send({'msg': false});
    }

    signUpUser = async (req, res, next) => {
        const { email_give, pw_give, name_give, phone_give, address_give } = req.body;
        const createUser = await this.userService.createUser(email_give, pw_give, name_give, phone_give, address_give);

        if(createUser){
            console.log('회원가입 성공')
            return res.status(200).send({ 'msg': true });
        } else{
            console.log('회원가입 실패')
            return res.status(400).send({ 'msg': false });
        }
        
    }
}

module.exports = UsersController;