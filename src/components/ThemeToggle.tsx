import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="theme-toggle">
      <select 
        value={theme}
        onChange={toggleTheme}
        className="theme-select"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}
