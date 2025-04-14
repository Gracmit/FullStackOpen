import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './Components/CountryList'

function App() {
  const [filter, setFilter] = useState("")
  const [results, setResults] = useState([])
  const [countries, setCountries] = useState([]);
  const [foundCountry, setFoundCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const api = import.meta.env.VITE_WEATHER_KEY


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
    if (newResults.length === 1 && !foundCountry) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${newResults[0]}`)
        .then(response => {
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${response.data.capital}&appid=${api}&units=metric`)
            .then(response2 => {
              console.log(response2.data)
              console.log(foundCountry)
              console.log(weather)
              setWeather(response2.data)
              setFoundCountry(response.data)
            })
        })
    }
    if (newResults.length !== 1 && foundCountry) {
      setFoundCountry(null);
    }
  }

  const showCountry = (event) => {
    setFilter(event.target.value)

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${event.target.value}`)
      .then(response => {
        setFoundCountry(response.data)
      })
  }

  return (
    <div>
      Search countries{" "}
      <input type="text" value={filter} onChange={handleFilterChanged} />
      <CountryList results={results} foundCountry={foundCountry} onButtonPress={showCountry} weather={weather}></CountryList>
    </div>
  )
}

export default App
