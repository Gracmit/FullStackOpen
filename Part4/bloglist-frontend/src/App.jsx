import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState([null, false])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

    setUser(JSON.parse(window.localStorage.getItem('currentUser')))
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

  const handleNewBlog = (event) => {
    event.preventDefault()
    blogService.create({
      title,
      author,
      url
    }).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMessage(['New blog added', false])
      setTimeout(() => {
        setNotificationMessage([null, false])
      }, 5000)
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

      <BlogForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={(event) => setTitle(event.target.value)}
        handleAuthorChange={(event) => setAuthor(event.target.value)}
        handleUrlChange={(event) => setUrl(event.target.value)}
        handleNewBlog={handleNewBlog}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App