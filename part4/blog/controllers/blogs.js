const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    } catch (e) {
        next(e);
    }
});

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (blog) {
            response.status(200).json(blog);
        } else {
            response.status(404).send('Not found');
        }
    } catch (e) {
        next(e);
    }
});

blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = new Blog(request.body);
        const { title, author, url, likes } = blog;

        if (!title || !url) {
            response.status(400).end();
            return;
        }

        const result = await blog.save();
        response.status(201).json(result);
    } catch (e) {
        next(e);
    }
});

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (e) {
        next(e);
    }
});

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const { likes } = request.body;

        const blog = { likes };

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

        if (updatedBlog) {
            response.status(200).json(updatedBlog);
        } else {
            response.status(404).end();
        }
    } catch (e) {
        next(e);
    }
});
1

module.exports = blogsRouter;
