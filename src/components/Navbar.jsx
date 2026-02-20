import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getFavorites } from '../utils/favorites'

export default function Navbar() {
    const [favCount, setFavCount] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    const updateCount = () => {
        setFavCount(getFavorites().length)
    }

    useEffect(() => {
        updateCount()
        window.addEventListener('favoritesUpdated', updateCount)
        window.addEventListener('storage', updateCount)
        return () => {
            window.removeEventListener('favoritesUpdated', updateCount)
            window.removeEventListener('storage', updateCount)
        }
    }, [])

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false)
    }, [location])

    // Is the user currently viewing a movie details page?
    const isOnMoviePage = location.pathname.startsWith('/movie/')

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="brand-icon">🎬</span>
                MovieExplorer
            </Link>

            {/* Hamburger (mobile) */}
            <button
                className="nav-hamburger"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                        🏠 Home
                    </NavLink>
                </li>
                <li>
                    {/* Highlights when on any /movie/:id route */}
                    <span
                        className={`nav-movies-hint ${isOnMoviePage ? 'active' : ''}`}
                        title="Click 'Details' on any movie card to open this page"
                    >
                        🎥 Movie Details {isOnMoviePage && <span className="live-dot"></span>}
                    </span>
                </li>
                <li>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
                        ❤️ Favorites
                        {favCount > 0 && <span className="fav-badge">{favCount}</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                        ℹ️ About
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
