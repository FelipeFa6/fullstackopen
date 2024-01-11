const listHelper = require('../utils/list_helper')

const testBlogs = [
  {
    _id: "1",
    title: "Introduction to JavaScript",
    author: "John Doe",
    url: "https://javascriptintro.com/",
    likes: 5,
  },
  {
    _id: "2",
    title: "HTML5 Tips and Tricks",
    author: "Jane Smith",
    url: "https://html5tips.com/",
    likes: 3,
  },
  {
    _id: "3",
    title: "CSS Simplified",
    author: "Alice Johnson",
    url: "https://csssimplified.io/",
    likes: 8,
  },
  {
    _id: "4",
    title: "Web Development Best Practices",
    author: "Bob Anderson",
    url: "https://webbestpractices.com/",
    likes: 12,
  },
  {
    _id: "5",
    title: "Getting Started with Node.js",
    author: "Charlie Brown",
    url: "https://nodejsstart.com/",
    likes: 6,
  },
  {
    _id: "6",
    title: "React Quick Guide",
    author: "Eva Davis",
    url: "https://reactquickguide.com/",
    likes: 10,
  },
  {
    _id: "8",
    title: "FullStack Open",
    author: "Eva Davis",
    url: "https://fullstackopen.com/en",
    likes: 10,
  }
];

const singleBlog = [
  {
    _id: "7",
    title: "Responsive Design Basics",
    author: "Grace Smith",
    url: "https://responsivedesignbasics.com/",
    likes: 9,
  }
];

describe("Helper", () => {
	test('dummy returns one', () => {
		const blogs = []
		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	});
})

describe('Total likes', () => {
	test('when list has only one blog, equals the likes of That', () => {
		const result = listHelper.totalLikes(singleBlog);
		expect(9).toBe(result);
	})
})

describe('favoriteBlog', () => {
    const mostLikedBlog = {
        _id: "4",
        title: "Web Development Best Practices",
        author: "Bob Anderson",
        url: "https://webbestpractices.com/",
        likes: 12,
    }
	test('returns the most liked blog object', () => {
		const result = listHelper.favoriteBlog(testBlogs);
		expect(mostLikedBlog).toEqual(result);
	})
})

describe('Author with the most blogs', () => {
    const authorWithMostBlogs = {
        author: "Eva Davis",
        blogs: 2
    }
	test('Should return Expected Author', () => {
		const result = listHelper.mostBlogs(testBlogs);
		expect(authorWithMostBlogs).toEqual(result)
	})
})

describe('Author with the most likes', () => {
    const authorWithMostLikes = {
        author: "Eva Davis",
        likes: 20
    }
	test('Should return Expected Author', () => {
		const result = listHelper.mostLikes(testBlogs);
		expect(authorWithMostLikes).toEqual(result)
	})
})
