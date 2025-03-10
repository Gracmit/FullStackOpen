import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"></Button>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
      <Button onClick={() => setBad(bad + 1)} text="bad"></Button>
      <Statisics good={good} neutral={neutral} bad={bad}></Statisics>
    </div>
  )
}


const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}


const Statisics = ({good, neutral, bad}) => {

  const calculateAvgScore = () => {
    return (good * 1 + bad * -1) / (good + neutral + bad);
  }

  const calculatePositivePercent = () => {
    return good / (good + neutral + bad) * 100;
  }

  if(good + neutral + bad === 0){
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text="Good" amount={good}></StatisticLine>
      <StatisticLine text="Neutral" amount={neutral}></StatisticLine>
      <StatisticLine text="Bad" amount={bad}></StatisticLine>
      <StatisticLine text="Average" amount={calculateAvgScore()}></StatisticLine>
      <StatisticLine text="Positive" amount={calculatePositivePercent()}></StatisticLine>
    </div>
  )
}


const StatisticLine = ({ text, amount }) => {
  return (
    <>
      <p>{text} {amount}</p>
    </>
  )
}


export default App