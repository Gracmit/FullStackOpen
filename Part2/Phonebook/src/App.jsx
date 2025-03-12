import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "04040404040", 
      id: 1
     }
  ])

  const [personsToShow, setPersonsToShow] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, SetFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.legth + 1
    }

    var sameName = persons.find((person) => person.name === newPerson.name);

    if(sameName !== undefined){
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const newPersons = persons.concat(newPerson)
    setPersons(newPersons);
    setNewName('');
    setNewNumber("");
    setPersonsToShow(newPersons.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase())))
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChanged = (event) => {
    SetFilter(event.target.value);
    const toShow = persons.filter((person) => person.name.toUpperCase().includes(event.target.value.toUpperCase()));
    setPersonsToShow(toShow);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input onChange={handleFilterChanged}></input>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        personsToShow.map(person => 
          <p key={person.id}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App