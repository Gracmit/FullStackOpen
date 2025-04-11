const Search = (props) => {
    return (
      <div>
        <h2>Numbers</h2>
        {
          props.show.map(person => {
            return <div key={person.id}>
              {person.name} {person.number}
              <button name={person.name} id={person.id} onClick={props.onDelete}>Delete</button>
            </div>
          })
        }
      </div>
    )
  }

  export default Search