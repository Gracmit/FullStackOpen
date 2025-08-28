const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {notes: 0})
    if (blogs) {
        response.json(blogs)
    }
    else {
        response.status(404).end()
    }
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', {notes: 0})
    if (blog) {
        response.status(200).json(blog)
    }
    else {
        response.status(404).end()
    }
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const blog = new Blog(request.body)
    

    if (!request.user) {
    response.status(400).json({ error: 'UserId missing or not valid' })
    return
  }


    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).json({ error: 'blog title or url missing' })
    }
    else {

        blog.user = request.user.id

        const savedBlog = await blog.save()
        const foundBlog = await Blog.findById(savedBlog.id).populate('user', {notes: 0})
        response.status(201).json(foundBlog)
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    const blogToDelete = await Blog.findById(request.params.id)

    if(blogToDelete.user.toString() === request.user.id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else{
        response.status(403).json({error: "Forbidden to delete other users blog"})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', {notes: 0})

    if(!blog) return response.status(404).end()

    blog.likes = request.body.likes

    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter