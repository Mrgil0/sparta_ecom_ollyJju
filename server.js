const http = require('./routes/app.js')
const dotenv = require('dotenv')
dotenv.config()


http.listen(process.env.PORT, async () => {
    console.log('server started!')
})