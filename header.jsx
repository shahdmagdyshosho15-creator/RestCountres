import { useTheme } from '../context/themecontext.jsx'

function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="header">
      <h1 className="header__title">Where in the world?</h1>
      <button className="header__theme-btn" onClick={toggleTheme}>
        {isDark ? '☀️' : '🌙'} {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  )
}

export default Header