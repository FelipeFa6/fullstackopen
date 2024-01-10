const express  = require('express');
const app      = express();
const cors     = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

// setup connection
mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("successfully connected to mongoDB!");
	})
	.catch(e => logger.error("error connecting to MongoDB: ", e.message));

app.use(cors());
app.use(express.static('dist'))
app.use(express.json());

app.get('/api/blogs', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
});

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});
