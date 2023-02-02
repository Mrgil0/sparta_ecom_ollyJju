const supertest = require('supertest');
const app = require('../../routes/users.routes.js');
const { sequelize } = require('../../models/index.js');

beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') await sequelize.sync();
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});

describe('POST /users/signup', () => {
	describe('given user data', () => {
		test('should respond with a 200 status code', async () => {
			const response = await supertest(app).post("/signup").send({
				//검사할 데이터
				email_give: 'test@naver.com', 
				pw_give: 'test123', 
				name_give: '이설인', 
				phone_give: '010-1111-1111', 
				address_give: '서울시'
			})
			expect(response.statusCode).toBe(200)
		})
		// test('should specify json in the content type header', async () => {
		// 	const response = await supertest(app).post("/user/signup").send({

		// 	})
		// 	expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
		// })
		// test('response has user_email', async () =>{
		// 	const response = await supertest(app).post("/signup").send({

		// 	})
		// 	expect(response.body.user_email).toBeDefined()
		// })
	})

	describe('when the user data is missing', () => {
		test('should respond with a 400 status code', async () => {
			const response = await supertest(app).post("/signup").send({
				//검사할 데이터
				email_give: 'test@naver.com', 
				pw_give: 'test123', 
				name_give: '이설인'
			})
			expect(response.statusCode).toBe(400)
		})
	})
})

afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.NODE_ENV === 'test') await sequelize.sync({ force: true });
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});