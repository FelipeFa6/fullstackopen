const lodash = require('lodash')

// always returns 1
const dummy = (blogs) => {
    //...
    return 1;
}

// sums the likes on the argument array
const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return likes;
}

// orders the arg array (+ to -) return the first element
const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    blogs.sort((a, b) => b.likes - a.likes);
    return blogs[0];
}

// return the author with more blogs in the array
const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    const blogsByAuthor = lodash.groupBy(blogs, 'author');

    const mostBlogsAuthor = lodash.maxBy(Object.keys(blogsByAuthor), author =>
        blogsByAuthor[author].length
    );

    return {
        author: mostBlogsAuthor,
        blogs: blogsByAuthor[mostBlogsAuthor].length
    };
};

// return the author with most likes
const mostLikes = (blogs) => {
    const authorLikes = []
    const groupedAuthors = lodash.chain(blogs).groupBy('author').value()

    Object.keys(groupedAuthors).forEach(e => {
        authorLikes.push([e, lodash.sumBy(groupedAuthors[e], 'likes')])
    })

    const mostLikedAuthor = authorLikes.reduce((prev, current) => (prev[1] < current[1]) ? current : prev)

    return {
        author: mostLikedAuthor[0],
        likes: mostLikedAuthor[1]
    }
}

module.exports = {
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    totalLikes
}
