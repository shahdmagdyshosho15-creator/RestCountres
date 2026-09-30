import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/themecontext.jsx'
import { CountriesProvider } from './context/countriescontext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CountriesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CountriesProvider>
    </ThemeProvider>
  </React.StrictMode>,
)