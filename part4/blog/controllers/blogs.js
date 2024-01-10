const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/api/blogs', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
});

blogRouter.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body)
	const { title, author, url, likes } = blog;

	console.log(title);
	console.log(author);
	console.log(url);
	console.log(likes);

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
});
