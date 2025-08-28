import { useState } from 'react'

const Blog = ({ blog, handleLike, deleteBlog, showDelete }) => {


  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeEvent = () => {
    const newObject = { ...blog,
      likes: blog.likes + 1,
      user: blog.user.id }
    handleLike(newObject)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          {blog.likes} likes {" "}
          <button onClick={handleLikeEvent}>like</button>
        </div>
        <p>{blog.user.name}</p>
        {console.log(showDelete)}
        {showDelete && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>
    </div>
  )
}

export default Blog