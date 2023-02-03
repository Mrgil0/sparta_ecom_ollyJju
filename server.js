const server = require('./routes/app.js')
const dotenv = require('dotenv')
dotenv.config()



server.listen(process.env.PORT, async () => {
    console.log('server started!')
})