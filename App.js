import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.js';
import Loader from './components/Loader.js';
import { ThemeProvider } from './utils/ThemeContext';

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Movie = lazy(() => import('./pages/Movie'));
const Favorites = lazy(() => import('./pages/Favorites'));

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </ThemeProvider>
  );
}