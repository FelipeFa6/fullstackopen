const requestLogger = (req, res, next) => {
	const initial_time = Date.now();

	res.on('finish', () => {
		const duration = Date.now() - initial_time;
		const timestamp = new Date().toISOString();

		logger.info(`${req.method} ${req.url} ${res.statusCode} ${res.get('content-length') || 0} - ${duration} ms`);
	});

	next();
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}  else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	}
	else {
		return response.status(400).send({ error: error.message })
	}

	next(error)
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { requestLogger, errorHandler, unknownEndpoint };
