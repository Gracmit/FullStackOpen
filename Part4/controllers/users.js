const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {user: 0})
    if (users) {
        response.json(users)
    }
    else {
        response.status(404).end()
    }
})

userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if(username.length < 4){
        response.status(400).json({error: 'username needs to be longer than 3 characters'})
    }

    if(password.length < 4){
        response.status(400).json({error: 'password needs to be longer than 3 characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const blogs = await Blog.find({})
    
    const user = new User({
        username,
        name,
        passwordHash,
        blogs: blogs[0]
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = userRouter