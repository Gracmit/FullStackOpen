import { useDispatch, useSelector } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'

const AnecdotesList = () => {
  const anecdotes = useSelector(state => {
    const filter = state.filter
    if (filter) {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }
    return state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdotesList