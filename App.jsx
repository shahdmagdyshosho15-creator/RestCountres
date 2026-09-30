import { Routes, Route } from 'react-router-dom'
import Header from './components/header.jsx'
import Home from './pages/home.jsx'
import CountryDetail from './pages/countrydetail.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </>
  )
}

export default App