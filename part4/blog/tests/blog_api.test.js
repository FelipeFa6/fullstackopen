const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
});

test('single blog element with json format', async () => {
	await api
		.get('/api/blogs/659d95aa7c8b60bb1a69ee2f')
		.expect(200)
		.expect('Content-Type', /application\/json/)
});

afterAll(async () => {
	await mongoose.connection.close()
});;
