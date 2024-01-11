const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
});

blogRouter.get('/:id', (request, response) => {
    console.log(request.params)
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.status(200).json(blog);
            } else {
                response.status(404).send('Not found');
            }
        })
        .catch(e => next(e));
});

blogRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)
	const { title, author, url, likes } = blog;

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
});

module.exports = blogRouter;
