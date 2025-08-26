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


after(async () => {
  await mongoose.connection.close()
})