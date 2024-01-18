const User      = require('../models/user')
const app       = require('../app');
const bcrypt    = require('bcrypt')
const mongoose  = require('mongoose');
const supertest = require('supertest');

const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
})

describe('POST /api/users', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails on missing username', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            name: 'John Doe',
            password: 'secret',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation fails on missing password', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: 'johndoe',
            name: 'John Doe',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation fails on short username and password', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: 'ab',
            name: 'John Doe',
            password: 'pw',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});;
