const _ = require('lodash');

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

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author');

    const mostBlogsAuthor = _.maxBy(Object.keys(blogsByAuthor), author =>
        blogsByAuthor[author].length
    );

    const result = {
        author: mostBlogsAuthor,
        blogs: blogsByAuthor[mostBlogsAuthor].length
    };

    return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
