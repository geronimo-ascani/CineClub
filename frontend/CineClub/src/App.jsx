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
    setMovies([]);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-orange-500">CineClub</h1>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {view === 'search' && (
          <>
            <SearchBar onSearch={handleSearch} />
  
            {loading && (<p className="mt-8 text-center text-slate-400">Cargando</p>)}
            {error && (<p className="mt-8 rounded-lg bg-red-950 px-4 py-3 text-red-300">{error}</p>)}
  
            {!loading && !error && (
              <MovieGrid movies={movies} onSelectMovie={handleSelectMovie} />
            )}

          </>
        )}       
 
        {view === 'detail' && (
          <MovieDetail tmdbId={selectedMovieId} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

export default App;