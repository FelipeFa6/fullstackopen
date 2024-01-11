const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('GET -> /api/blogs', () => {
    test('blogs are returned in JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
})

//Single id test
/*
* describe('GET -> /api/blogs/:id', () => {
*     test('single blog retreived', async () => {
*         await api
*             .get('/api/blogs/65a04ef859788ee90e463095')
*             .expect(200)
*             .expect('Content-Type', /application\/json/)
*     })
* });
*/

afterAll(async () => {
	await mongoose.connection.close()
});;
