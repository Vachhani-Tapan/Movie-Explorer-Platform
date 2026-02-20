import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites'

const API_KEY = '4a3b711b'
const API_BASE = 'https://www.omdbapi.com/'

export default function MovieDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [fav, setFav] = useState(false)
    const [favAnim, setFavAnim] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchMovie = async () => {
            setLoading(true)
            setError('')
            setMovie(null)
            try {
                const res = await fetch(`${API_BASE}?apikey=${API_KEY}&i=${id}&plot=full`)
                const data = await res.json()
                if (data.Response === 'True') {
                    setMovie(data)
                    setFav(isFavorite(data.imdbID))
                } else {
                    setError(data.Error || 'Movie not found.')
                }
            } catch {
                setError('Network error. Please check your connection.')
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [id])

    const toggleFav = () => {
        if (fav) {
            removeFavorite(movie.imdbID)
            setFav(false)
        } else {
            addFavorite(movie.imdbID)
            setFav(true)
            setFavAnim(true)
            setTimeout(() => setFavAnim(false), 600)
        }
    }

    /* ── LOADING ── */
    if (loading) {
        return (
            <div className="page">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Fetching movie details...</p>
                </div>
            </div>
        )
    }

    /* ── ERROR ── */
    if (error) {
        return (
            <div className="page">
                <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm details-back-btn">
                    ← Go Back
                </button>
                <div className="error-state" style={{ marginTop: '2rem' }}>
                    <div className="error-icon">🎭</div>
                    <p style={{ fontWeight: 600 }}>{error}</p>
                    <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        🏠 Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    if (!movie) return null

    const hasPoster = movie.Poster && movie.Poster !== 'N/A'
    const genres = movie.Genre && movie.Genre !== 'N/A' ? movie.Genre.split(', ') : []
    const rating = movie.imdbRating !== 'N/A' ? movie.imdbRating : null
    const votes = movie.imdbVotes !== 'N/A' ? movie.imdbVotes : null
    const ratings = movie.Ratings || []

    return (
        <div className="page fade-up">

            {/* ── BACK BUTTON ── */}
            <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm details-back-btn">
                ← Go Back
            </button>

            {/* ── HERO SECTION ── */}
            <div className="details-hero">

                {/* POSTER */}
                <div className="details-poster-wrap">
                    {hasPoster ? (
                        <img className="details-poster" src={movie.Poster} alt={movie.Title} />
                    ) : (
                        <div className="no-poster" style={{ minHeight: 420 }}>
                            <span style={{ fontSize: '5rem' }}>🎬</span>
                            <p>No Poster Available</p>
                        </div>
                    )}

                    {/* Favorite button over poster on mobile */}
                    <button
                        className={`poster-fav-btn ${fav ? 'is-fav' : ''} ${favAnim ? 'pop' : ''}`}
                        onClick={toggleFav}
                        title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
                    >
                        {fav ? '❤️' : '🤍'}
                    </button>
                </div>

                {/* INFO PANEL */}
                <div className="details-info">

                    {/* Type badge */}
                    {movie.Type && (
                        <span className="details-type-badge">
                            {movie.Type === 'movie' ? '🎥 Movie' : movie.Type === 'series' ? '📺 Series' : '📋 Episode'}
                        </span>
                    )}

                    {/* Title */}
                    <h1 className="details-title">{movie.Title}</h1>

                    {/* Meta chips row */}
                    <div className="details-meta">
                        {movie.Year && movie.Year !== 'N/A' && (
                            <span className="meta-chip">📅 {movie.Year}</span>
                        )}
                        {movie.Runtime && movie.Runtime !== 'N/A' && (
                            <span className="meta-chip">⏱ {movie.Runtime}</span>
                        )}
                        {movie.Rated && movie.Rated !== 'N/A' && (
                            <span className="meta-chip">🏷 {movie.Rated}</span>
                        )}
                        {movie.Language && movie.Language !== 'N/A' && (
                            <span className="meta-chip">🌐 {movie.Language.split(',')[0]}</span>
                        )}
                    </div>

                    {/* IMDb Rating */}
                    {rating && (
                        <div className="details-rating-row">
                            <div className="imdb-score">
                                <span className="imdb-star">⭐</span>
                                <span className="imdb-num">{rating}</span>
                                <span className="imdb-outof">/ 10</span>
                                {votes && <span className="imdb-votes">({votes} votes)</span>}
                            </div>
                        </div>
                    )}

                    {/* Genre tags */}
                    {genres.length > 0 && (
                        <div>
                            <p className="details-section-label">Genre</p>
                            <div className="details-genres">
                                {genres.map((g) => (
                                    <span key={g} className="genre-tag">{g}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="details-divider" />

                    {/* Plot */}
                    {movie.Plot && movie.Plot !== 'N/A' && (
                        <div>
                            <p className="details-section-label">📖 Plot</p>
                            <p className="details-plot">{movie.Plot}</p>
                        </div>
                    )}

                    {/* Director */}
                    {movie.Director && movie.Director !== 'N/A' && (
                        <div className="details-crew-row">
                            <span className="details-section-label">🎬 Director</span>
                            <span className="details-crew-val">{movie.Director}</span>
                        </div>
                    )}

                    {/* Writer */}
                    {movie.Writer && movie.Writer !== 'N/A' && (
                        <div className="details-crew-row">
                            <span className="details-section-label">✍️ Writer</span>
                            <span className="details-crew-val">{movie.Writer}</span>
                        </div>
                    )}

                    {/* Cast */}
                    {movie.Actors && movie.Actors !== 'N/A' && (
                        <div className="details-crew-row">
                            <span className="details-section-label">🎭 Cast</span>
                            <span className="details-crew-val">{movie.Actors}</span>
                        </div>
                    )}

                    {/* Country / Released */}
                    {(movie.Country && movie.Country !== 'N/A') && (
                        <div className="details-crew-row">
                            <span className="details-section-label">🌍 Country</span>
                            <span className="details-crew-val">{movie.Country}</span>
                        </div>
                    )}

                    {/* External Ratings */}
                    {ratings.length > 0 && (
                        <div>
                            <p className="details-section-label" style={{ marginBottom: '0.6rem' }}>🏆 Ratings</p>
                            <div className="details-ratings-grid">
                                {ratings.map((r) => (
                                    <div key={r.Source} className="rating-source-card">
                                        <span className="rating-source-name">{r.Source}</span>
                                        <span className="rating-source-val">{r.Value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="details-divider" />

                    {/* Action buttons */}
                    <div className="details-actions">
                        <button
                            className={`btn ${fav ? 'btn-danger' : 'btn-success'} ${favAnim ? 'pop' : ''}`}
                            onClick={toggleFav}
                            style={{ flex: 1, justifyContent: 'center' }}
                        >
                            {fav ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                        </button>
                        <Link to="/favorites" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                            View All Favorites
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
