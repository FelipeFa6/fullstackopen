const info = (...params) => {
    //avoid logs on test enviroment
    if(process.env.NODE_ENV === "test") return null;

    console.log(...params)
}

const error = (...params) => {
	console.log(...params)
}

module.exports = { info, error }
