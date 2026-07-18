import { useState } from 'react';
import SearchBar from './componentes/SearchBar';
import MovieGrid from './componentes/MovieGrid';
import MovieDetail from './componentes/MovieDetail';
import { searchMovies } from './services/api';

function App() {
  const [view, setView] = useState('search');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

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
    setSelectedMovieId(tmdbId);
    setView('detail');
  }

  function handleBack(){
    setView('search');
    setSelectedMovieId(null);
  }

  return (
    <div className="app">
      <header>
        <h1>CineClub</h1>
      </header>
 
      {view === 'search' && (
        <>
          <SearchBar onSearch={handleSearch} />
 
          {loading && <p>Cargando...</p>}
          {error && <p className="error-message">{error}</p>}
 
          {!loading && !error && (
            <MovieGrid movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </>
      )}
 
      {view === 'detail' && (
        <MovieDetail tmdbId={selectedMovieId} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;