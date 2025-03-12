const Course = ({ courses }) => {
    return (
      <div>
        {
          courses.map((course) =>
            <div key={course.id}>
              <Header  course={course.name} />
              <Content parts={course.parts} />
              <Total  parts={course.parts} />
            </div>)
        }
      </div>
    )
  }

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map(part =>
            <Part key={part.id} name={part.name} exercise={part.exercises} />)
        }
      </div>
    )
  }
  
  const Total = ({ parts }) => {
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

  export default Course