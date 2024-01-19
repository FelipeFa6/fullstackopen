const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog');

const getTokenFrom = (request) => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('Bearer ')) {
        return auth.substring(7)
    }
    return null
}


blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
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
        const body = request.body;
        const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'invalid token' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        });

        if (!title || !url) {
            response.status(400).end();
            return;
        }

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save()

        response.status(201).json(savedBlog);
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

module.exports = blogsRouter;
