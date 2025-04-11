import { useState, useEffect} from 'react'
import Search from "./components/Search"
import Filter from "./components/Filter"
import Form  from './components/Form'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState("");

  useEffect(() => {

    numberService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
        setPersonsToShow(initialNumbers)
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

    numberService
      .create(newPerson)
      .then(returnedList =>{
        let newPersons = persons.concat(returnedList)
        setPersons(newPersons);
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

  const handleDeleteButton = (event) => {
      if(confirm("delete " + event.target.name + "?")){
        numberService
          .deleteNumber(event.target.id)
          .then(deletedNumber => {
            let newPersons = persons.toSpliced(persons.indexOf(deletedNumber), 1)
            setPersons(newPersons)
            setPersonsToShow(newPersons.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase())))
          })
      }
  }

  return (
    <div>
      <Filter onStateChange={handleFilterChanged}></Filter>
      <Form onSubmit={addName} onNameChanged={handleNameChange}
        onNumberChanged={handleNumberChange} name={newName} number={newNumber}></Form>
      <Search show={personsToShow} onDelete={handleDeleteButton}></Search>
    </div>
  )
}





export default App