import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

const update = async (id) => {
  const anecdote = await get(id.toString())
  const response = await axios.patch(`${baseUrl}/${id}`, { content: anecdote.content, votes: anecdote.votes + 1 })
  return response.data
}

export default { getAll, create, update }