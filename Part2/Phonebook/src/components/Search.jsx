const Search = (props) => {
    return (
      <div>
        <h2>Numbers</h2>
        {
          props.show.map(person =>
            <p key={person.id}>{person.name} {person.number}</p>)
        }
      </div>
    )
  }

  export default Search