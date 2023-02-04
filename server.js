const server = require('./routes/app.js')
require('./socket')
const dotenv = require('dotenv')
dotenv.config()



server.listen(process.env.PORT, async () => {
    console.log('server started!')
})