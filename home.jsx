import { useSearchParams } from 'react-router-dom'
import { useCountries } from '../context/countriescontext.jsx'
import { Link } from 'react-router-dom'

function Home() {
  const { countries, loading, error } = useCountries()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const region = searchParams.get('region') || ''

  if (loading) return <p className="status-msg">Loading countries...</p>
  if (error) return <p className="status-msg">Error: {error}</p>

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(search.toLowerCase())
    const matchesRegion = region ? country.region === region : true
    return matchesSearch && matchesRegion
  })

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (value) params.set('search', value)
      else params.delete('search')
      return params
    })
  }

  const handleRegionChange = (e) => {
    const value = e.target.value
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (value) params.set('region', value)
      else params.delete('region')
      return params
    })
  }

  return (
    <main className="home">
      <div className="home__controls">
        <input
          type="text"
          placeholder="Search for a country..."
          className="home__search"
          value={search}
          onChange={handleSearchChange}
        />
        <select className="home__filter" value={region} onChange={handleRegionChange}>
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="home__grid">
        {filteredCountries.map((country) => (
          <Link key={country.alpha3Code} to={`/country/${country.alpha3Code}`} className="card">
            <img src={country.flags.png} alt={country.name} className="card__flag" />
            <div className="card__info">
              <h3 className="card__name">{country.name}</h3>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Capital:</strong> {country.capital}</p>
            </div>
         </Link>
               ))}
             </div>
  
    </main>
  )
}

export default Home