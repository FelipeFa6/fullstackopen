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

describe('favoriteBlog', () => {
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

describe('author with the most blogs', () => {
	const listOfAuthors = [
		{ author: "Expected Author", likes:0},
		{ author: "Expected Author", likes:0},
		{ author: "Ada Lovelace", likes:4},
	]

	const expectedResult = {
		author: "Expected Author",
		blogs:2
	};

	test('Should return Expected Author', () => {
		const result = listHelper.mostBlogs(listOfAuthors);
		expect(result).toEqual(expectedResult)
	})
})


describe('author with the most likes', () => {
	const listOfAuthors = [
		{ author: "Expected Author", likes:10},
		{ author: "Expected Author", likes:20},
		{ author: "Ada Lovelace", likes:4},
	]

	const expectedResult = {
		author: "Expected Author",
		likes:30
	};

	test('Should return Expected Author', () => {
		const result = listHelper.mostLikes(listOfAuthors);
		expect(result).toEqual(expectedResult)
	})
})
