import { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    handleNewBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <form onSubmit={addNewBlog}>
        <div>
          <label>
                        title:
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
                        author:
            <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
                        url:
            <input type="text" value={url} onChange={(event) => setUrl(event.target.value)}></input>
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm