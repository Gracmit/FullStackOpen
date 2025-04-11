const CountryList = ({ results, foundCountry }) => {




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

    if (foundCountry) {
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

            </div>
        )
    }

    return (
        <ul>
            {results.map((country) => (
                <li key={country}>{country}</li>
            ))}
        </ul>
    )
}

export default CountryList