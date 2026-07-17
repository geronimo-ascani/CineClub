import { useState } from 'react';
import SearchBar from './componentes/SearchBar';
import MovieGrid from './componentes/MovieGrid';
import { searchMovies } from './services/api';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(query) {
    setLoading(true);
    setError(null);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectMovie(tmdbId) {
    console.log('Película seleccionada:', tmdbId);
  }

  return (
    <div>
      <h1>CineClub</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <MovieGrid movies={movies} onSelectMovie={handleSelectMovie} />
      )}
    </div>
  );
}

export default App;