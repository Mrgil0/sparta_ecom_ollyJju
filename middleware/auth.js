const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = process.env
const { Hogyuns } = require('../models')

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers
  
  const [tokenType, token] = authorization.split(' ')
  console.log(tokenType, token)
  const isTokenValid = token && tokenType === 'Bearer'
  console.log(isTokenValid)

  if (!isTokenValid) {
    return res.status(401).json({ message: '로그인 후 이용해주세요.' })
  }
  
  try {
    const { user_email } = jwt.verify(token, JWT_SECRET_KEY)
    const user = await Hogyuns.findOne({ where: { user_email } })

    res.locals.currentUser = user
    next()
  } catch (err) {
    res.status(401).json({ message: '로그인 후 이용해주세요!!!'})
  }
} 

module.exports = authMiddleware