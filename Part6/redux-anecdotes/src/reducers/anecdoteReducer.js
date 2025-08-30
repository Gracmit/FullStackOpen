import { createSlice } from '@reduxjs/toolkit'
import AnecdoteServices from '../services/Anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createNewAnecdote: (state, action) => {
      console.log(action.payload)
      state.push(action.payload)
    },
    voteAAnecdote: (state, action) => {
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const anecdotes = state.map(a => a.id === id ? votedAnecdote : a)
      return anecdotes.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { createNewAnecdote, voteAAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await AnecdoteServices.create(content)
    dispatch(createNewAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await AnecdoteServices.update(id)
    dispatch(voteAAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer