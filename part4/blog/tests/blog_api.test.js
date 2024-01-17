const Blog      = require('../models/blog');
const app       = require('../app');
const helper    = require('./test_helper');
const mongoose  = require('mongoose');
const supertest = require('supertest');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({})

	let blogObjects = helper.initialData
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
}, 100000)

describe('GET /api/blogs', () => {
    test('blogs are returned in JSON format', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('__id toJSON parse', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    })
});

describe("POST /api/blogs", () => {
    test('add a new blog to database', async () => {
        const blogsAtInit = await helper.blogsInDb();

        await api.post('/api/blogs')
            .send(helper.valid_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtFinish = await helper.blogsInDb();
        expect(blogsAtFinish).toHaveLength(blogsAtInit.length +1)
    })

    test('empty title or url = bad request', async () => {
        const response = await api.post('/api/blogs').send(helper.invalid_blog);
        expect(response.status).toEqual(400);
    });

})

describe("PUT /api/blogs/:id", () => {
	test('blog with new amount of likes is updated', async () => {
		const blogsAtInit = await helper.blogsInDb()
		const selectedBlog = blogsAtInit[0]

		const updateData = {
			likes: 42
		}

		await api
			.put(`/api/blogs/${selectedBlog.id}`)
			.send(updateData)
			.expect(200)

		const blogsAtFinish = await helper.blogsInDb()
		const likes = blogsAtFinish.map(b => b.likes)
		expect(likes).toContain(updateData.likes)
	})
})

describe("DELETE /api/blogs/:id", () => {
    test('deletion of resource', async () => {
        const blogsAtInit = await helper.blogsInDb()
        const blogToDelete = blogsAtInit[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtFinish = await helper.blogsInDb()

        expect(blogsAtFinish).toHaveLength(helper.initialData.length - 1)

        const titles = blogsAtFinish.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe("MODEL integrity", () => {
    test("if like not set default to -> 0", async () => {
        const blog = new Blog(helper.valid_blog);
        const { likes } = blog;
        expect(likes).toEqual(0);
    })
})

afterAll(async () => {
    await mongoose.connection.close()
});;
