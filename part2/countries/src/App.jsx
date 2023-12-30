import { useState, useEffect } from 'react'
import countriesService from './services/Countries'

const App = () => {

    const [ countries, setCountries ] = useState([])
    const [ filter, setFilter ] = useState('')

    const filterHandler = (event) => {
        setFilter(event.target.value)
    }

    const filteredCountries = () => countries.filter(country =>
        country.toLowerCase().includes(filter.toLowerCase())
    )


    const fetchCountries = () => {
        countriesService
            .getAll()
            .then((response) => {
                const countryNames = response.data.map(country => country.name.common)
                setCountries(countryNames)
            })
    }

    // on load
    useEffect(fetchCountries, [])

    return (
        <div>
            <div>
                find countries <input onChange={filterHandler} value={filter}/>
            </div>

            <Countries countries={filteredCountries()}/>
        </div>
  )
}

export default App

const Countries = ({ countries }) => {
    if (countries.length === 0) {
        return <p>Loading...</p>
    }

    if (countries.length > 10) {
        return <p>Be more specific</p>
    }

    if (countries.length === 1) {
        return <Details name={countries[0]} />
    }

    return (
        <div>
        {
            countries.map((country, index) => (
                <div key={index}>
                - {country}
                </div>
            ))
        }
        </div>
    )
}

const Details = ({name}) => {
    const [ current, setCurrent ] = useState(null)

    useEffect(() => {
        countriesService
            .getByName(name)
            .then(response => {
                setCurrent(response.data)
            })
    }, [name])

    return (
        <div>
            { current ?
                <>
                    <h1>{ current.name.common }</h1>
                    <p>Capital: { current.capital.join(', ') }</p>
                    <p>Area { current.area }</p>
                    <h2>Languages</h2>
                    <ul>
                        {Object.entries(current.languages).map(([code, language]) => (
                            <li key={code}>{`${language}`}</li>
                        ))}

                    </ul>
                    <span style={{fontSize: '10em'}}>{current.flag}</span>
                </>
                :
                <p>Loading...</p>
            }
        </div>
    )
}
