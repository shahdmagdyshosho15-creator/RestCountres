import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCountries } from '../context/countriescontext.jsx'

function CountryDetail() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { countries, loading, error } = useCountries()

  if (loading) return <p className="status-msg">Loading...</p>
  if (error) return <p className="status-msg">Error: {error}</p>

  const country = countries.find((c) => c.alpha3Code === code)

  if (!country) return <p className="status-msg">Country not found.</p>

  const borderCountries = countries.filter((c) => country.borders?.includes(c.alpha3Code))

  return (
    <main className="detail">
      <button className="detail__back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail__content">
        <img src={country.flags.png} alt={country.name} className="detail__flag" />

        <div className="detail__info">
          <h2 className="detail__name">{country.name}</h2>

          <div className="detail__facts">
            <div className="detail__facts-col">
              <p><strong>Native Name:</strong> {country.nativeName}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion}</p>
              <p><strong>Capital:</strong> {country.capital}</p>
            </div>
            <div className="detail__facts-col">
              <p><strong>Top Level Domain:</strong> {country.topLevelDomain?.join(', ')}</p>
              <p><strong>Currencies:</strong> {country.currencies?.map((c) => c.name).join(', ')}</p>
              <p><strong>Languages:</strong> {country.languages?.map((l) => l.name).join(', ')}</p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="detail__borders">
              <strong>Border Countries:</strong>
              <div className="detail__borders-list">
                {borderCountries.map((b) => (
                  <Link key={b.alpha3Code} to={`/country/${b.alpha3Code}`} className="detail__border-btn">
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default CountryDetail