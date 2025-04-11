import { useState, useEffect} from 'react'
import Search from "./components/Search"
import Filter from "./components/Filter"
import Form  from './components/Form'
import Notification  from './components/Notification'
import numberService from './services/numbers'


const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState("");
  // notification message will be array with first elemnt being the message and the second being boolean for checking is it error or normal notification
  const [notificationMessage, setNotificationMessage] = useState([null, false])

  useEffect(() => {
    fetchPhonebook()
  }, [])

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    var samePerson = persons.find((person) => person.name === newPerson.name);

    if (samePerson !== undefined) {
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        numberService
        .update(samePerson.id, newPerson)
        .then(returnedObject => {
          let newPersons = persons.toSpliced(persons.indexOf(samePerson), 1, returnedObject)
          setPersons(newPersons)
          setNewName('');
          setNewNumber("");
          setPersonsToShow(newPersons.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase())))
          setNotificationMessage([`${newName} was updated`, false])
          setTimeout(() => {
            setNotificationMessage([null, false])
          }, 3000)
        })
        .catch(error => {
          setNotificationMessage([`Error: ${newName} was already deleted from the server`, true])

          var deletedPerson = persons.find((person) => person.id === event.target.id)
          let newPersons = persons.toSpliced(persons.indexOf(deletedPerson), 1)
          setPersons(newPersons)
          setPersonsToShow(newPersons.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase())))

          setTimeout(() => {
            setNotificationMessage([null, false])
          }, 3000)
        })
      }
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
        setNotificationMessage([`${newName} was added to phonebook`, false])
        setTimeout(() => {
          setNotificationMessage([null, false])
        }, 3000)
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
          .catch(error => {
            setNotificationMessage([`Error: ${newName} was already deleted from the server`, true])

            var deletedPerson = persons.find((person) => person.id === event.target.id)
            let newPersons = persons.toSpliced(persons.indexOf(deletedPerson), 1)
            setPersons(newPersons)
            setPersonsToShow(newPersons.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase())))

            setTimeout(() => {
              setNotificationMessage([null, false])
            }, 3000)
          })
      }
  }

  const fetchPhonebook = () => {
    numberService
    .getAll()
    .then(initialNumbers => {
      setPersons(initialNumbers)
      setPersonsToShow(initialNumbers)
    })
  }

  return (
    <div>
      <Filter onStateChange={handleFilterChanged}></Filter>
      <Notification message={notificationMessage[0]} error={notificationMessage[1]}></Notification>
      <Form onSubmit={addName} onNameChanged={handleNameChange}
        onNumberChanged={handleNumberChange} name={newName} number={newNumber}></Form>
      <Search show={personsToShow} onDelete={handleDeleteButton}></Search>
    </div>
  )
}





export default App