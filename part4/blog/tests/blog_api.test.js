const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

describe('API endpoint test /api/blogs', () => {
    test('blogs are returned in JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('__id toJSON parse', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    })

    test('add a new blog to database', async () => {
        //count current DB data
        const blogsAtInit = await helper.blogsInDb();

        //insert new blog
        const new_blog = {
            title: "Exploring the Wonders of Machine Learning",
            author: "TechEnthusiast21",
            url: "www.techenthusiast21.com/exploring-machine-learning"
        };

        await api.post('/api/blogs')
            .send(new_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtFinish = await helper.blogsInDb();
        expect(blogsAtFinish).toHaveLength(blogsAtInit.length +1)
    })


/*
 * //Single id test
 * test('single blog retreived', async () => {
 *     await api
 *         .get('/api/blogs/65a04ef859788ee90e463095')
 *         .expect(200)
 *         .expect('Content-Type', /application\/json/)
 * })
 */
});


afterAll(async () => {
    await mongoose.connection.close()
});;
