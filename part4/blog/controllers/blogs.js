const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

blogRouter.get('/:id', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (blog) {
            response.status(200).json(blog);
        } else {
            response.status(404).send('Not found');
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

blogRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body);
        const { title, author, url, likes } = blog;

        const result = await blog.save();
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = blogRouter;
