import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFavorites, removeFavorite } from '../utils/favorites'

const API_KEY = '4a3b711b'
const API_BASE = 'https://www.omdbapi.com/'

export default function Favorites() {
    const [favIds, setFavIds] = useState([])
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    const loadFavorites = () => {
        const ids = getFavorites()
        setFavIds(ids)
        return ids
    }

    useEffect(() => {
        const ids = loadFavorites()
        if (ids.length === 0) {
            setLoading(false)
            return
        }
        fetchFavoriteMovies(ids)
    }, [])

    const fetchFavoriteMovies = async (ids) => {
        setLoading(true)
        try {
            const promises = ids.map((id) =>
                fetch(`${API_BASE}?apikey=${API_KEY}&i=${id}`)
                    .then((r) => r.json())
                    .catch(() => null)
            )
            const results = await Promise.all(promises)
            setMovies(results.filter((m) => m && m.Response === 'True'))
        } catch {
            setMovies([])
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = (id) => {
        removeFavorite(id)
        const updatedIds = getFavorites()
        setFavIds(updatedIds)
        setMovies((prev) => prev.filter((m) => m.imdbID !== id))
    }

    return (
        <div className="page">
            <div className="page-header fade-up">
                <h1 className="page-title">❤️ Favorites</h1>
                <p className="page-subtitle">Your saved movies and series</p>
            </div>

            {!loading && movies.length > 0 && (
                <div className="fav-count-banner fade-up">
                    <div>
                        <div className="fav-count-num">{movies.length}</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {movies.length === 1 ? 'Movie Saved' : 'Movies Saved'}
                        </p>
                    </div>
                </div>
            )}

            {loading && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading your favorites...</p>
                </div>
            )}

            {!loading && movies.length === 0 && (
                <div className="empty-state fade-up">
                    <div className="empty-icon">🎭</div>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        No favorite movies added.
                    </p>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Browse movies and click the heart icon to save them here.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        🏠 Explore Movies
                    </Link>
                </div>
            )}

            {!loading && movies.length > 0 && (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <FavCard key={movie.imdbID} movie={movie} onRemove={handleRemove} />
                    ))}
                </div>
            )}
        </div>
    )
}

function FavCard({ movie, onRemove }) {
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
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <p className="movie-card-year" style={{ color: '#ffd700' }}>⭐ {movie.imdbRating}</p>
                )}
                <div className="movie-card-actions">
                    <Link
                        to={`/movie/${movie.imdbID}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                    >
                        Details
                    </Link>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemove(movie.imdbID)}
                        title="Remove from Favorites"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    )
}
