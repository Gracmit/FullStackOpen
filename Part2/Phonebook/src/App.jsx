import { useState, useEffect} from 'react'
import Search from "./components/Search"
import Filter from "./components/Filter"
import Form  from './components/Form'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
        console.log(response.data)
        setPersonsToShow(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    var sameName = persons.find((person) => person.name === newPerson.name);

    if (sameName !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    axios .post("http://localhost:3001/persons", newPerson)
      .then(response => {
        let newPersons  = persons.concat(response.data)
        setPersons(newPerson);
        setNewName('');
        setNewNumber("");
        setPersonsToShow(newPersons.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase())))
      })

    
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