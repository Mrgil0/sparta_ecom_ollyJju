// 임시 로그인용
require('dotenv').config();
const express = require('express')
const router = express.Router()
const { Hogyuns } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = process.env

// 로그인 api 
router.post('/', async (req, res) => {
  const { user_email, user_password } = req.body

  try {
    const user = await Hogyuns.findOne({ user_email })
    // console.log(user)
    const isPasswordCorrect = await Hogyuns.findOne( {user_password} )
    console.log(isPasswordCorrect)

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' })
    }

    res.json({ token: jwt.sign({ user_email }, JWT_SECRET_KEY) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router