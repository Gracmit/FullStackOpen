const CountryList = ({ results, foundCountry, onButtonPress, weather}) => {
    if (results.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if (results.length === 0) {
        return (
            <p>No matches</p>
        )
    }

    if (foundCountry !== null && weather !== null) {
        return (
            <div>
                <h1>{foundCountry.name.common}</h1>
                <p>Capital: {foundCountry.capital[0]}</p>
                <p>Area: {foundCountry.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(foundCountry.languages).map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
                <img src={foundCountry.flags.png} alt={foundCountry.flags.alt} />
                <h2>Weather in {foundCountry.capital}</h2>
                <p>Temperature: {weather.main.temp} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
        )
    }

    return (
        <ul>
            {results.map((country) => (
                <li key={country}>{country + " "}
                    <button onClick={onButtonPress} value={country}>Show</button>
                </li>
            ))}
        </ul>
    )
}

export default CountryList