import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import omdbApi from '../api/omdb';
import { useFavorites } from '../hooks/useLocalStorage';
import { FaStar } from 'react-icons/fa';
import Loader from '../components/Loader';

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, toggleFavorite] = useFavorites();
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await omdbApi.getMovieDetails(id);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="page movie-page">
      <div className="movie-header">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
          alt={movie.Title}
        />
        <div className="movie-info">
          <h1>{movie.Title} ({movie.Year})</h1>
          <p className="genre">{movie.Genre}</p>
          <div className="action-bar">
            <button
              className={`favorite ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(id)}
            >
              <FaStar /> {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
          <p className="plot">{movie.Plot}</p>
          <div className="details-grid">
            <div><span>Director:</span> {movie.Director}</div>
            <div><span>Actors:</span> {movie.Actors}</div>
            <div><span>Runtime:</span> {movie.Runtime}</div>
            <div><span>IMDB Rating:</span> {movie.imdbRating}</div>
          </div>
        </div>
      </div>
    </div>
  );
}