import { Link } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Search</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
}