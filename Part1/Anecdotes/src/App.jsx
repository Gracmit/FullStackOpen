import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const generateEmptyVotes = () => {
    const voteArray = [];
    anecdotes.forEach((element) => voteArray.push(0));
    return voteArray;
  }

  const addVote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVote(copy);

    findAnecdoteWithMostVotes(copy)
  }

  const findAnecdoteWithMostVotes = (copy) => {
    console.log(copy);
    let mostCurrentVotes = 0;
    let mostVotesIndex = -1;
    for (let i = 0; i < copy.length; i++){
      if(copy[i] > mostCurrentVotes){
        mostVotesIndex = i;
        mostCurrentVotes = copy[i];
      }
    }

    if(mostVotesIndex === -1){
      return;
    }
    
    console.log(mostVotesIndex);
    setMostVotes(mostVotesIndex);
  }


  const setMostVotesText = () => {
    if(mostVotes === -1){
      return "No votes given";
    }
    return anecdotes[mostVotes];
  }

  const SetVotesText = () => {
    if(mostVotes === -1){
      return "";
    }
    return "Has " + votes[mostVotes] + " votes";
  }

  const [votes, setVote] = useState(generateEmptyVotes());
  const [selected, setSelected] = useState(0);
  const [mostVotes, setMostVotes] = useState(-1);



  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next Anecdote</button>
      <button onClick={() => addVote()}>Vote</button>
      <p>has {votes[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      <p>{setMostVotesText()}</p>
      <p>{SetVotesText()}</p>
    </div>
  )
}

export default App