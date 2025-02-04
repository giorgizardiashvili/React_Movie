import { useEffect, useState } from 'react';
import omdbApi from '../api/omdb';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await omdbApi.searchMovies('movie');
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Popular Movies</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}