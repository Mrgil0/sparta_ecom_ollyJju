const app = require('./app.js')

describe('POST /users/signup', () => {
	describe('given user data', () => {

		test('should respond with a 200 status code', async () => {
			const response = await request(app).post("/users/signup").send({
				//검사할 데이터
				user_email: 'test@naver.com', 
				user_password: 'test123', 
				user_name: '이설인', 
				user_phone: '010-1111-1111', 
				user_address: '서울시', 
				user_type:'guest', 
				user_point: 0
			})
			expect(response.statusCode), toBe(200)
		})
		test('should specify json in the content type header', async () => {
			const response = await request(app).post("/user/signup").send({

			})
			expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
		})
		test('response has user_email', async () =>{
			const response = await request(app).post("/user/signup").send({

			})
			expect(response.body.user_email).toBeDefined()
		})
	})

	describe('when the user data is missing', () => {
		test('should respond with a 400 status code', async () => {
			const response = await request(app).post("/users/signup").send({
				//검사할 데이터
				user_email: 'test@naver.com', 
				user_password: 'test123', 
				user_name: '이설인'
			})
			expect(response.statusCode), toBe(400)
		})
	})
})