const nodemailer = require('nodemailer');
require('dotenv').config();
const env = process.env;

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
		host: 'smtp.naver.com',
		port: 587,
    auth: {
        user: env.smtp-user,
        pass: env.smtp-pass
		},
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports={
      smtpTransport
  }