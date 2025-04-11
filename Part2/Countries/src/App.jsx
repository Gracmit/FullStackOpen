import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './Components/CountryList'

function App() {
  const [filter, setFilter] = useState("")
  const [results, setResults] = useState([])
  const [countries, setCountries] = useState([]);
  const [foundCountry, setFoundCountry] = useState(null);


  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data.map((object) => object = object.name.common))
      })
  }, [])

  const handleFilterChanged = (event) => {
    const newResults = countries.filter((country) => country.toLowerCase().includes(event.target.value.toLowerCase()))
    setResults(newResults)
    setFilter(event.target.value)
    if(newResults.length === 1 && !foundCountry){
      axios 
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${newResults[0]}`)
        .then(response => {
          setFoundCountry(response.data)
        })
    }
    if(newResults.length !== 1 && foundCountry){
      setFoundCountry(null);
    }
  }

  return (
    <div>
      Search countries{" "}
      <input type="text" value={filter} onChange={handleFilterChanged} />
      <CountryList results={results} foundCountry={foundCountry}></CountryList>
    </div>
  )
}

export default App
