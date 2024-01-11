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
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
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
