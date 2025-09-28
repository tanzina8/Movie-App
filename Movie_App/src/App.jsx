import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce }  from 'react-use'
import './index.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]); // Trending movies
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounces search term to prevent too many API requests
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const url = query
        ? `http://localhost:5000/api/movies?query=${encodeURIComponent(query)}`
        : `http://localhost:5000/api/movies`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch movies');

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setErrorMessage('Error fetching movies. Please try again later.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch trending (top 4 in Canada this week)
  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/trending`);
      if (!response.ok) throw new Error('Failed to fetch trending movies');

      const data = await response.json();
      setFeaturedMovies(data || []);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
    }
  };

  // Fetch movies whenever searchTerm changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Fetch trending on mount
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./popcorn.png" alt="Popcorn Banner" className='popcorn-banner' />
          <h1>
            What Will You <span className="text-gradient">Watch?</span>
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* Trending Section (only shows when search is empty) */}
        {!searchTerm && featuredMovies.length > 0 && (
          <section className="featured-movies mt-[40px]">
            <h2 className="text-gradient text-3xl mb-4">Trending in Canada</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredMovies.map((movie, index) => (
                <div key={movie.id} className="relative">
                  {/* Big number overlay */}
                  <span className="rank-number absolute -top-5 -left-5 ">
                    {index + 1}
                  </span>
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/No-Poster.png'}
                    alt={movie.title}
                    className="rounded-lg object-cover w-full h-[380px] sm:h-[450px] transform transition-transform duration-300 hover:scale-105"
                  />

                </div>
              ))}
            </div>
          </section>
        )}

        <section className="all-movies">
          <h2 className="text-gradient mt-[40px]">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movies.length === 0 ? (
            <p className="text-white">No movies found.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  );
};

export default App;
