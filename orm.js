const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto('olly_jju', 'rooyt', '159qweasd', {
   host: 'express-database.casm02smbjrj.ap-northeast-2.rds.amazonaws.com',  // DB Host 주소
   port: '3306',  // 포트 번호
   dialect: 'mysql'  // 사용하는 DBMS 종류
})

auto.run()