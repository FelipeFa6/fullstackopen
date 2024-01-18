const info = (...params) => {
    if(process.env.NODE_ENV === "test") return null;
    console.log(...params)
}

const error = (...params) => {
    if(process.env.NODE_ENV === "test") return null;
	console.log(...params)
}

module.exports = { info, error }
