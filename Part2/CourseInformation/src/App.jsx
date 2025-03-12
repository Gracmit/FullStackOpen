const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {
        parts.map(part => 
        <Part key={part.id} name={part.name} exercise={part.exercises}/>)
      }
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p>
        Number of exercises {
          parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0,)
        }
      </p>
    </div>
  )
}


const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercise}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Debugging',
        exercises: 5,
        id: 4
      }
    ]
  }

  return (
      <Course course={course} />
  )
}


const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App