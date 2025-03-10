import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"></Button>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
      <Button onClick={() => setBad(bad + 1)} text="bad"></Button>
      <h1>Statistics</h1>
      <Counter text="good" amount={good}></Counter>
      <Counter text="neutral" amount={neutral}></Counter>
      <Counter text="bad" amount={bad}></Counter>
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const Counter = ({text, amount}) => {
  return(
    <>
      <p>{text} {amount}</p>    
    </>
  )
}

export default App