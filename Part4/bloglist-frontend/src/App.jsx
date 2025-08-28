import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState([null, false])
  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      sortAndSetBlogs(blogs)
    })

    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
    setUser(currentUser)
    blogService.setToken(currentUser?.token)
  }, [])

  const handleLogIn = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('currentUser', JSON.stringify(user))

      setUsername('')
      setPassword('')

      setNotificationMessage(['Login successful', false])
      setTimeout(() => {
        setNotificationMessage([null, false])
      }, 5000)

    } catch {
      console.error('wrong credentials')
      setNotificationMessage(['Wrong credentials', true])
      setTimeout(() => {
        setNotificationMessage([null, false])
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('currentUser')
    setNotificationMessage(['Logged out', false])
    setTimeout(() => {
      setNotificationMessage([null, false])
    }, 5000)
  }

  const handleNewBlog = (newNote) => {
    blogService.create(newNote).then(returnedBlog => {
      sortAndSetBlogs(blogs.concat(returnedBlog))

      blogRef.current.toggleVisibility()

      setNotificationMessage(['New blog added', false])
      setTimeout(() => {
        setNotificationMessage([null, false])
      }, 5000)
    })
  }

  const handleLike = (newObject) => {
    blogService.update(newObject.id, newObject).then(returnedBlog => {
      sortAndSetBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
    })
  }

  const sortAndSetBlogs = (blogsToSort) => {
    setBlogs(blogsToSort.sort((a, b) => b.likes - a.likes))
  }

  const handleDelete = (id) => {
    blogService.deleteBlog(id).then(() => {
      sortAndSetBlogs(blogs.filter(blog => blog.id !== id))
    })
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage[0]} error={notificationMessage[1]} />
        <Login username={username}
          password={password}
          handleUsernameChange={(event) => setUsername(event.target.value)}
          handlePasswordChange={(event) => setPassword(event.target.value)}
          handleLogIn={handleLogIn}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage[0]} error={notificationMessage[1]} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>

      <Togglable buttonLabel={'Create new blog'} reference={blogRef}>
        <BlogForm
          handleNewBlog={handleNewBlog}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={handleDelete} showDelete={user.username === blog.user.username} />
      )}
    </div>
  )
}

export default App