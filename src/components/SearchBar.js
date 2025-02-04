import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search movies by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
}