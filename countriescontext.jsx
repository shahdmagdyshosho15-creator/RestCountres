import { createContext, useContext, useState, useEffect } from 'react'

const CountriesContext = createContext()

const API_URL = 'https://countries.dev/countries?fields=name,region,subregion,capital,population,flags,alpha3Code,currencies,languages,borders,topLevelDomain,nativeName'

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch countries')
        return res.json()
      })
      .then((data) => {
        setCountries(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <CountriesContext.Provider value={{ countries, loading, error }}>
      {children}
    </CountriesContext.Provider>
  )
}

export function useCountries() {
  return useContext(CountriesContext)
} 