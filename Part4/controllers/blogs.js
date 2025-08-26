const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    if (blogs) {
        response.json(blogs)
    }
    else {
        response.status(404).end()
    }
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.status(200).json(blog)
    }
    else {
        response.status(404).end()
    }
})


blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).end()
    }
    else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if(!blog) return response.status(404).end()

    blog.likes = request.body.likes

    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter