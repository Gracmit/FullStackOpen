const { test, describe, beforeEach, expect } = require('@playwright/test')
const blog = require('../../Part4/models/blog')

describe('Login tests', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'Masa',
                password: 'salasana',
                name: 'Matti Meikäläinen'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await page.getByLabel('username').fill('Masa')
        await page.getByLabel('password').fill('salasana')
        await page.getByRole('button', { name: 'Log in' }).click()
        await expect(page.getByText('Matti Meikäläinen logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await page.getByLabel('username').fill('Masa')
        await page.getByLabel('password').fill('wrongpassword')
        await page.getByRole('button', { name: 'Log in' }).click()
        await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
})

describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'Masa',
                password: 'salasana',
                name: 'Matti Meikäläinen'
            }
        })

        await page.goto('http://localhost:5173')
        await page.getByLabel('username').fill('Masa')
        await page.getByLabel('password').fill('salasana')
        await page.getByRole('button', { name: 'Log in' }).click()
    })

    test('a blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByLabel('title:').fill('Test Blog')
        await page.getByLabel('author:').fill('Masa')
        await page.getByLabel('url:').fill('http://localhost:3003/api/blogs')
        await page.getByRole('button', { name: 'Create' }).click()
        await expect(page.getByText('Test Blog Masa')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByLabel('title:').fill('Test Blog')
        await page.getByLabel('author:').fill('Masa')
        await page.getByLabel('url:').fill('http://localhost:3003/api/blogs')
        await page.getByRole('button', { name: 'Create' }).click()

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('1 likes')).toBeVisible()
    })

    test('a blog can be removed', async ({ page }) => {

        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByLabel('title:').fill('Test Blog')
        await page.getByLabel('author:').fill('Masa')
        await page.getByLabel('url:').fill('http://localhost:3003/api/blogs')
        await page.getByRole('button', { name: 'Create' }).click()

        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'delete' }).click()
        await expect(page.getByText('Test Blog Masa')).not.toBeVisible()
    })

    test('blogs are arranged correctly', async ({ page }) => {
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByLabel('title:').fill('Test Blog')
        await page.getByLabel('author:').fill('Masa')
        await page.getByLabel('url:').fill('http://localhost:3003/api/blogs')
        await page.getByRole('button', { name: 'Create' }).click()
        
        await page.getByRole('button', { name: 'view' }).click()

        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByLabel('title:').fill('Test Blog 2')
        await page.getByLabel('author:').fill('Masa')
        await page.getByLabel('url:').fill('http://localhost:3003/api/blogs2')
        await page.getByRole('button', { name: 'Create' }).click()

        await page.getByRole('button', { name: 'view' }).click()

        const deleteButtons = await page.getByRole('button', { name: 'delete' }).all()
        await deleteButtons[1].click()

        await expect(page.getByText('Test Blog 2 Masa')).toBeVisible()
    })
})