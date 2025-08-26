const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(result => {
        logger.info("Connected to MongoDB")
    })
    .catch(error => {
        logger.error("Error connecting to MongoDB", error.message)
    })


app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app