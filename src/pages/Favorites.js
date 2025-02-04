import { useEffect, useState } from 'react';
import omdbApi from '../api/omdb';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { useFavorites } from '../hooks/useLocalStorage';

export default function Favorites() {
  const [favorites] = useFavorites();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const promises = favorites.map(id => omdbApi.getMovieDetails(id));
        const responses = await Promise.all(promises);
        setMovies(responses.map(r => r.data));
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) loadFavorites();
    else setLoading(false);
  }, [favorites]);

  return (
    <div className="page favorites-page">
      <h1 className="page-title">Favorite Movies</h1>
      
      {loading ? (
        <Loader />
      ) : (
        <div className="movies-results">
          {movies.length > 0 ? (
            <div className="movies-grid">
              {movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)}
            </div>
          ) : (
            <p className="no-results centered-message">No favorite movies yet. Start adding some!</p>
          )}
        </div>
      )}
    </div>
  );
}