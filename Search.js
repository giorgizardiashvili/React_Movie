import { useState, useEffect, useCallback } from 'react';
import omdbApi from '../api/omdb';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await omdbApi.searchMovies(searchQuery);
      setResults(response.data.Search || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMovies(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, searchMovies]);

  return (
    <div className="page search-page">
      <h1 className="page-title">Search Movies</h1>
      
      <div className="search-container">
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="movies-results">
          {results.length > 0 ? (
            <div className="movies-grid">
              {results.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            query && !loading && (
              <p className="no-results">No movies found for "{query}"</p>
            )
          )}
        </div>
      )}
    </div>
  );
}