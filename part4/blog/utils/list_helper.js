const dummy = (blogs) => {
	//...
	return 1;
}

const totalLikes = (blogs) => {
	const likes = blogs.reduce((sum, blog) => {
		return sum + blog.likes
	}, 0)
	return likes;
}

const favoriteBlog = (blogs) => {
	blogs.sort((a, b) => b.likes - a.likes);
	return blogs[0];
}

module.exports = { dummy, totalLikes, favoriteBlog }
