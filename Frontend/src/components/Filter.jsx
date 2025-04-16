const Filter = (props) => {

    return (
      <div>
        <h2>Phonebook</h2>
        filter phonebook: <input onChange={props.onStateChange}></input>
      </div>
    )
  }

export default Filter