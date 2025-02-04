import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useLocalStorage';
import { FaStar } from 'react-icons/fa';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [favorites, toggleFavorite] = useFavorites();
  const isFavorite = favorites.includes(movie.imdbID);

  return (
    <motion.div 
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="card-footer">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="card-actions">
          <span className="movie-year">{movie.Year}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.imdbID);
            }}
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          >
            <FaStar />
          </button>
        </div>
      </div>
    </motion.div>
  );
}