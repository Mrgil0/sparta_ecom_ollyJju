const express = require('express')
const dotenv = require('dotenv')
const router = require('./routes')
const app = express()
/* .env */
dotenv.config()


/* middleware */
app.use(express.json())


/* routes */
app.post('/api', router)






/* server */
app.listen(process.env.PORT, async () => {
  console.log('server started!')
})