const express = require('express')
const { sequelize } = require('./models')
const dotenv = require('dotenv')
dotenv.config()

const my_pageRouter = require('./routes/my_page')
const authRouter = require('./routes/auth') // 임시 로그인용
const path = require('path'); // path 불러옴

const app = express()
app.use(express.json())

// ejs를 쓰기 위한 것
app.use(express.static('./static'))
app.set('view engine', 'ejs'); //view engine이 사용할 Template Engine
app.set('views', path.join(__dirname, './static/views')); // Template가 있는 디렉토리

app.get('/', (req, res) => {
  res.send('HiHi')
})

app.use('/page/mypage', my_pageRouter)
app.use('/login', authRouter) // 임시 로그인용

app.listen(process.env.PORT, async () => {
  console.log('server started!')
  await sequelize.authenticate()
  console.log('DB authenticate!')
})