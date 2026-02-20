import { Link } from 'react-router-dom'

const features = [
    {
        icon: '🔍',
        title: 'Smart Search',
        desc: 'Search millions of movies, series, and episodes from the OMDB database in real time.',
    },
    {
        icon: '🎭',
        title: 'Detailed Info',
        desc: 'Get full details including plot, cast, director, genre, runtime, and IMDb rating.',
    },
    {
        icon: '❤️',
        title: 'Favorites',
        desc: 'Save your favorite movies locally. They persist across sessions using localStorage.',
    },
    {
        icon: '🔎',
        title: 'Filters',
        desc: 'Filter results by release year and content type — movies, series, or episodes.',
    },
]

const techs = [
    'React 18', 'React Router v6', 'OMDB API', 'localStorage',
    'useState', 'useEffect', 'useParams', 'Vite', 'CSS3',
]

export default function About() {
    return (
        <div className="page fade-up">
            <div className="page-header">
                <h1 className="page-title">ℹ️ About</h1>
                <p className="page-subtitle">Everything you need to know about Movie Explorer</p>
            </div>

            <div
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius)',
                    padding: '2rem',
                    maxWidth: '720px',
                    margin: '0 auto 2.5rem',
                    textAlign: 'center',
                }}
            >
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎬</div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    Movie Explorer
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                    Movie Explorer is a modern React application that lets you discover, search,
                    and organize your favorite films and TV shows. Powered by the free OMDB API,
                    it provides instant access to a vast catalog of movies with detailed information.
                </p>
            </div>

            <h2
                style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    textAlign: 'center',
                    marginBottom: '1.25rem',
                }}
            >
                Features
            </h2>

            <div className="about-grid">
                {features.map((f) => (
                    <div key={f.title} className="about-card">
                        <div className="about-card-icon">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <h2
                    style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '1rem',
                    }}
                >
                    Tech Stack
                </h2>
                <div className="about-tech-list">
                    {techs.map((t) => (
                        <span key={t} className="tech-badge">{t}</span>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link to="/" className="btn btn-primary">
                    🏠 Start Exploring
                </Link>
            </div>
        </div>
    )
}
