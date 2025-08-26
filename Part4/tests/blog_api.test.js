const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const Helper = require('./test_helper')

const api = supertest(app)

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
    .send(blog)
    .expect(201)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, Helper.initialBlogs.length + 1)

  const contents = response.body.map(r => r.url)

  assert(contents.includes('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions2.htmll'))
})


after(async () => {
  await mongoose.connection.close()
})