const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');

const middleware = require('./utils/middleware');

const blogsRouter = require('./controllers/blogs');

// setup connection
mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("successfully connected to mongoDB!");
	})
	.catch(e => logger.error("error connecting to MongoDB: ", e.message)
	);

const app = express();
app.use(cors());
app.use(express.static('dist'))
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;