const http = require('./routes/app.js')
const dotenv = require('dotenv')
dotenv.config()

const http = require("./routes/app");
const dotenv = require('dotenv')
dotenv.config()
require("./socket"); // 이렇게 불러오기만 해도 소켓에 연결이 됩니다.


http.listen(process.env.PORT, async () => {
    console.log('server started!')
})
http.listen(process.env.PORT, async () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
  await sequelize.authenticate()
  console.log('DB authenticate!')
});