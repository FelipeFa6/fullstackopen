const logger = require('./logger');

const requestLogger = (req, res, next) => {
	const initialTime   = Date.now();
	const requestedPath = req.path;

	res.on('finish', () => {
		const duration  = Date.now() - initialTime;
		const timestamp = new Date().toISOString();

		logger.info(`${req.method} ${requestedPath} ${res.statusCode} - ${duration} ms`);
		logger.info('---');
	});

	next();
};


const errorHandler = (error, req, res, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}  else if (error.name === 'ValidationError') {
		return res.status(400).send({ error: error.message })
	}
	else {
		return res.status(400).send({ error: error.message })
	}

	next(error)
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { requestLogger, errorHandler, unknownEndpoint };
