import { useState } from 'react'
import Search from "./components/Search"
import Filter from "./components/Filter"
import Form  from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: "04040404040",
      id: 1
    }
  ])

  const [personsToShow, setPersonsToShow] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.legth + 1
    }

    var sameName = persons.find((person) => person.name === newPerson.name);

    if (sameName !== undefined) {
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
    setFilter(event.target.value);
    const toShow = persons.filter((person) => person.name.toUpperCase().includes(event.target.value.toUpperCase()));
    setPersonsToShow(toShow);
  }

  return (
    <div>
      <Filter onStateChange={handleFilterChanged}></Filter>
      <Form onSubmit={addName} onNameChanged={handleNameChange}
        onNumberChanged={handleNumberChange} name={newName} number={newNumber}></Form>
      <Search show={personsToShow}></Search>
    </div>
  )
}





export default App