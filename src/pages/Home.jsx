import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites'

const API_KEY = '4a3b711b'
const API_BASE = 'https://www.omdbapi.com/'

const POSTER_FALLBACK = (title) =>
    `https://via.assets.so/movie.png?id=${encodeURIComponent(title)}&q=95&w=400&h=600&fit=fill`

export default function Home() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [yearFilter, setYearFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [favorites, setFavorites] = useState({})
    const [searched, setSearched] = useState(false)

    // Sync favorites state from localStorage
    const syncFavorites = () => {
        const ids = JSON.parse(localStorage.getItem('movieExplorerFavorites') || '[]')
        const map = {}
        ids.forEach((id) => (map[id] = true))
        setFavorites(map)
    }

    useEffect(() => {
        syncFavorites()
        window.addEventListener('favoritesUpdated', syncFavorites)
        return () => window.removeEventListener('favoritesUpdated', syncFavorites)
    }, [])

    const fetchMovies = async (searchTerm, year = '', type = '') => {
        if (!searchTerm.trim()) return
        setLoading(true)
        setError('')
        setSearched(true)
        try {
            let url = `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
            if (year.trim()) url += `&y=${year.trim()}`
            if (type) url += `&type=${type}`

            const res = await fetch(url)
            const data = await res.json()

            if (data.Response === 'True') {
                setMovies(data.Search)
            } else {
                setMovies([])
                setError(data.Error || 'No movies found.')
            }
        } catch {
            setError('Network error. Please check your connection.')
            setMovies([])
        } finally {
            setLoading(false)
        }
    }

    // Load default movies on mount
    useEffect(() => {
        fetchMovies('batman')
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        fetchMovies(query || 'batman', yearFilter, typeFilter)
    }

    const handleFilterChange = (newYear, newType) => {
        const currentQuery = query || 'batman'
        fetchMovies(currentQuery, newYear, newType)
    }

    const handleYearChange = (e) => {
        const val = e.target.value
        setYearFilter(val)
        if (val.length === 0 || val.length === 4) {
            handleFilterChange(val, typeFilter)
        }
    }

    const handleTypeChange = (e) => {
        const val = e.target.value
        setTypeFilter(val)
        handleFilterChange(yearFilter, val)
    }

    const toggleFavorite = (id) => {
        if (favorites[id]) {
            removeFavorite(id)
        } else {
            addFavorite(id)
        }
        syncFavorites()
    }

    return (
        <div className="page">
            <div className="page-header fade-up">
                <h1 className="page-title">🎬 Movie Explorer</h1>
                <p className="page-subtitle">Search millions of movies and TV shows</p>
            </div>

            {/* Search */}
            <form className="search-section fade-up" onSubmit={handleSearch}>
                <div className="search-input-wrap">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search movies, series..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>

            {/* Filters */}
            <div className="filters-section fade-up">
                <span className="filter-label">Filters:</span>
                <input
                    type="number"
                    className="filter-input"
                    placeholder="Year (e.g. 2022)"
                    value={yearFilter}
                    onChange={handleYearChange}
                    min="1900"
                    max="2026"
                />
                <select
                    className="filter-select"
                    value={typeFilter}
                    onChange={handleTypeChange}
                >
                    <option value="">All Types</option>
                    <option value="movie">🎥 Movies</option>
                    <option value="series">📺 Series</option>
                    <option value="episode">📋 Episodes</option>
                </select>
            </div>

            {/* Results */}
            {loading && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Searching movies...</p>
                </div>
            )}

            {!loading && error && (
                <div className="error-state">
                    <div className="error-icon">🎭</div>
                    <p>{error}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Try a different search term or filters.
                    </p>
                </div>
            )}

            {!loading && movies.length > 0 && (
                <>
                    <p className="results-info">
                        Showing <span>{movies.length}</span> results
                        {query && <> for <span>"{query}"</span></>}
                    </p>
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                isFav={!!favorites[movie.imdbID]}
                                onToggleFav={() => toggleFavorite(movie.imdbID)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

function MovieCard({ movie, isFav, onToggleFav }) {
    const hasPoster = movie.Poster && movie.Poster !== 'N/A'

    return (
        <div className="movie-card">
            <div className="movie-poster-wrap">
                {hasPoster ? (
                    <img
                        className="movie-poster"
                        src={movie.Poster}
                        alt={movie.Title}
                        loading="lazy"
                        onError={(e) => { e.target.style.display = 'none' }}
                    />
                ) : (
                    <div className="no-poster">
                        <span>🎬</span>
                        <p>No Poster</p>
                    </div>
                )}
                <span className="movie-type-badge">{movie.Type}</span>
            </div>

            <div className="movie-card-body">
                <h3 className="movie-card-title" title={movie.Title}>{movie.Title}</h3>
                <p className="movie-card-year">📅 {movie.Year}</p>
                <div className="movie-card-actions">
                    <Link
                        to={`/movie/${movie.imdbID}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                    >
                        Details
                    </Link>
                    <button
                        className={`btn btn-sm ${isFav ? 'btn-danger' : 'btn-outline'}`}
                        onClick={onToggleFav}
                        title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                    >
                        {isFav ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    )
}
