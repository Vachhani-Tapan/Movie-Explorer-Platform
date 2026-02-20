# 🎬 Movie Explorer Platform

A modern, fully-featured **Movie Explorer App** built with **React + Vite**, powered by the [OMDB API](https://www.omdbapi.com/). Search, filter, and save your favorite movies and TV shows with a sleek dark glassmorphism UI.

---

## 🚀 Live Preview

> Run locally using the steps below — open **https://movie-explorer-platform.netlify.app/**

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Search** | Search millions of movies & series in real time |
| 🏷️ **Filters** | Filter by **Year** and **Type** (Movie / Series / Episode) |
| 🎥 **Movie Details** | Full details page — poster, plot, cast, genre, IMDb rating |
| ❤️ **Favorites** | Save movies to favorites using `localStorage` — persists on refresh |
| 🔢 **Live Count** | Navbar badge shows real-time favorites count |
| 📱 **Responsive** | Mobile-friendly with hamburger menu |
| 💫 **Animations** | Smooth fade-up, hover, and pop animations throughout |

---

## 📸 Pages & Routes

```
/              → Home Page      (Search + Filters + Movie Grid)
/movie/:id     → Movie Details  (Full Info via IMDB ID)
/favorites     → Favorites Page (Saved movies from localStorage)
/about         → About Page     (App info + tech stack)
```

---

## 🛠️ Tech Stack

- **React 18** — Functional components only
- **Vite 7** — Lightning-fast dev server & build tool
- **React Router v6** — Client-side routing & dynamic routes
- **OMDB API** — Free movie database API
- **localStorage** — Favorites persistence (no backend needed)
- **Vanilla CSS** — Dark glassmorphism design system

### React Hooks Used
`useState` · `useEffect` · `useParams` · `useNavigate`

---

## 📂 Project Structure

```
src/
├── main.jsx                 # BrowserRouter entry point
├── App.jsx                  # Route definitions
├── index.css                # Global dark theme + animations
├── utils/
│   └── favorites.js         # localStorage helpers (add/remove/get/check)
├── components/
│   └── Navbar.jsx           # Sticky navbar with favorites badge
└── pages/
    ├── Home.jsx             # Search + filters + movie grid
    ├── MovieDetails.jsx     # Full movie details
    ├── Favorites.jsx        # Favorites list from localStorage IDs
    └── About.jsx            # About page
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/Vachhani-Tapan/Movie-Explorer-Platform.git

# 2. Navigate into the project
cd Movie-Explorer-Platform

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **https://movie-explorer-platform.netlify.app/** in your browser.

### Build for Production

```bash
npm run build
```

---

## 🔑 API Configuration

This project uses the **OMDB API** (free tier).  
The API key is stored in `src/pages/Home.jsx` and `src/pages/MovieDetails.jsx`:

```js
const API_KEY = '4a3b711b'
```

To use your own key:
1. Get a free key at [omdbapi.com](https://www.omdbapi.com/apikey.aspx)
2. Replace `4a3b711b` with your key in both files

### API Endpoints Used

| Purpose | Endpoint |
|---|---|
| Search movies | `https://www.omdbapi.com/?apikey=KEY&s=QUERY&type=TYPE&y=YEAR` |
| Movie details | `https://www.omdbapi.com/?apikey=KEY&i=IMDB_ID&plot=full` |

---

## 💡 Core Logic

### Favorites (localStorage)

```js
// Save movie ID
["tt1234567", "tt9876543"]

// Add favorite — no duplicates
addFavorite("tt1234567")

// Remove favorite
removeFavorite("tt1234567")

// Check if favorited
isFavorite("tt1234567") // → true / false
```

When a favorite is added/removed, a custom `favoritesUpdated` event fires — the Navbar instantly reflects the new count.

### Filtering

On the Home page, Year and Type filters hit the API live:
- **Year input** — triggers re-fetch after a valid 4-digit year is entered
- **Type dropdown** — `movie` / `series` / `episode` — updates results instantly

---

## 📋 Requirements Coverage

| Requirement | Implemented |
|---|---|
| Functional components | ✅ |
| React Router with 4 routes | ✅ |
| `useState` | ✅ |
| `useEffect` | ✅ |
| `useParams` | ✅ |
| `localStorage` for favorites | ✅ |
| Dynamic routes `/movie/:id` | ✅ |
| Favorites count in Navbar | ✅ |
| Prevent duplicate favorites | ✅ |
| Filter by Year + Type | ✅ |
| App does not crash | ✅ |

---

## 👨‍💻 Author

**Tapan Vachhani**  
GitHub: [@Vachhani-Tapan](https://github.com/Vachhani-Tapan)

---

## 📄 License

This project is for educational purposes.