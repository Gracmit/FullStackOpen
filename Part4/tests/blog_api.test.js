const { test, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const Helper = require('./test_helper')

const api = supertest(app)

let token = 'Bearer '
before(async () => {

  await User.deleteMany({})
  const userResponse = await api.post('/api/users')
  .send({
    username: 'Masa',
    name: 'Matti Meikäläinen',
    password: 'salasana'
  })
  
  const response = await api.post('/api/login')
  .send({
    username: 'Masa',
    password: 'salasana'
  })

  Helper.setUserToInitialBlogs(userResponse.body.id)
  token += response.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(Helper.initialBlogs)
})

test('Get all Blogs', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, Helper.initialBlogs.length)
})

test('Is id written correctly', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(Object.keys(response.body[0]).find(key => key === 'id'), 'id')
})

test('Blog gets added to database', async () => {
  const blog =
  {
    title: 'First class tests 2',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions2.htmll',
    likes: 102,
  }


  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(blog)
    .expect(201)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, Helper.initialBlogs.length + 1)

  const contents = response.body.map(r => r.url)

  assert(contents.includes('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions2.htmll'))
})

test('If likes are missing', async () => {
  const blog =
  {
    title: 'First class tests 3',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions3.htmll',
  }


  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(blog)
    .expect(201)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[response.body.length - 1].likes, 0)
})

test('If title is missing', async () => {
    const blog =
  {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions3.htmll',
  }

    await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(blog)
    .expect(400)
})

test('If url is missing', async () => {
    const blog =
  {
    title: 'First class tests 3',
    author: 'Robert C. Martin',
  }


    await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(blog)
    .expect(400)
})

test('Delete blog', async () => {
    blogsAtStart = await Helper.blogsInDb()  
    const blogToDelete = blogsAtStart[0]

    console.log(blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

      const blogsAtEnd = await Helper.blogsInDb()

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('Update blog', async () => {
  blogsAtStart = await Helper.blogsInDb()  
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 200

  await api.put(`/api/blogs/${blogToUpdate.id}`)
  .send({likes: 200})
  .expect(200)

  const response = await api.get(`/api/blogs/${blogToUpdate.id}`)

  assert.strictEqual(response.body.likes, 200)
})

after(async () => {
  await mongoose.connection.close()
})