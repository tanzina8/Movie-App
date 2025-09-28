require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

// Allow requests from frontend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Single route: trending OR search
app.get('/api/movies', async (req, res) => {
  try {
    const { query } = req.query;
    let url;

    if (query) {
      // Search movies
      url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
    } else {
      // Trending / popular movies
      url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.VITE_TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching TMDB data:', err);
    res.status(500).json({ error: 'Failed to fetch movies from TMDB' });
  }
});

// New route: Top 3-4 trending in Canada this week
app.get('/api/trending', async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/trending/all/week?region=CA`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.VITE_TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    // Return top 4 trending
    res.json(data.results.slice(0, 4));
  } catch (err) {
    console.error('Error fetching trending movies:', err);
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
