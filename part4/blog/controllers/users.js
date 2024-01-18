const bcrypt     = require('bcrypt');
const usersRouter = require('express').Router();
const User       = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({});
        response.json(users);
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/', async (request, response, next) => {
    try{
        const { username, name, password } = request.body

        if (password.length <= 3){
            response.status(400).json({error: "Password should be > 3 long."})
            return;
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (e) {
        next(e)
    }
})

module.exports = usersRouter;
