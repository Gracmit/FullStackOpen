import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('renders Blogs content', () => {
    const mockHandler = vi.fn()
    beforeEach(() => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'Masa Mäkäläinen',
            url: 'https://example.com/component-testing',
            likes: 5,
            user: {
                id: '123',
                name: 'Matti Meikäläinen'
            }
        }
        
        render(<Blog blog={blog} handleLike={mockHandler} />)
    })

    test('blog title and author are shown by default', () => {
        let element = screen.getByText('Component testing is done with react-testing-library', { exact: false })
        expect(element).toBeVisible()
        element = screen.getByText('Masa Mäkäläinen', { exact: false })
        expect(element).toBeVisible()
    })

    test('blog url, likes and creator are invisible', () => {
        let element = screen.getByText('https://example.com/component-testing', { exact: false })
        expect(element).not.toBeVisible()
        element = screen.getByText('5 likes', { exact: false })
        expect(element).not.toBeVisible()
        element = screen.getByText('Matti Meikäläinen', { exact: false })
        expect(element).not.toBeVisible()
    })

    test('after clicking the view button, url, likes and creator are shown', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        let element = screen.getByText('https://example.com/component-testing', { exact: false })
        expect(element).toBeVisible()
        element = screen.getByText('5 likes', { exact: false })
        expect(element).toBeVisible()
        element = screen.getByText('Matti Meikäläinen', { exact: false })
        expect(element).toBeVisible()
    })

    test('clicking the like button twice calls event handler twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})