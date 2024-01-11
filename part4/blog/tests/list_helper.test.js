const listHelper = require('../utils/list_helper')

describe("Helper", () => {
	test('dummy returns one', () => {
		const blogs = []
		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	});
})

describe('Total likes', () => {
	const listWithOneBlog = [
		{ likes: 1 },
	];

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(1);
	})
})

describe('highest likes post', () => {
	const expectedBlog = {
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		likes: 20
	};

	const blogs = [
		{ likes: 11 },
		{ likes: 2 },
		{ likes: 3 },
		{...expectedBlog},
		{ likes: 14 },
		{ likes: 5 },
	]

	test('returns the most liked blog object', () => {
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toEqual(expectedBlog);
	})
})
