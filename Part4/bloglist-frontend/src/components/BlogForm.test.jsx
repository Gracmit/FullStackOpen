import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import { beforeEach, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockHandler = vi.fn()
    render(<BlogForm handleNewBlog={mockHandler} />)

    const user = userEvent.setup()
    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Component testing is done with react-testing-library')
    await user.type(authorInput, 'Masa Mäkäläinen')
    await user.type(urlInput, 'https://example.com/component-testing')
    await user.click(sendButton)

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith({
        title: 'Component testing is done with react-testing-library',
        author: 'Masa Mäkäläinen',
        url: 'https://example.com/component-testing'
    })
})