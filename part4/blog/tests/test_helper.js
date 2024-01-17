const Blog = require('../models/blog')

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const initialData = [
    {
        title: "Testing Object",
        author: "John Doe",
        url: "https://SomeTestingUrl.com/",
        likes: 420
    },
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }
];

const valid_blog = {
	title: "Exploring the Wonders of Machine Learning",
	author: "TechEnthusiast21",
	url: "www.techenthusiast21.com/exploring-machine-learning"
};

const invalid_blog = {
	author: "John Doe"
};

module.exports = { blogsInDb, initialData, valid_blog, invalid_blog }
