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
  const [searchKey, setSearchKey] = useState(0);

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

  function handleGoHome() {
    setView('search');
    setSelectedMovieId(null);
    setMovies([]);
    setLoading(false);
    setError(null);
    setSearchKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4">
        <button
          onClick={handleGoHome}
          className="cursor-pointer text-2xl font-bold text-orange-500 transition-colors hover:text-orange-400"
        >
          CineClub
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {view === 'search' && (
          <>
            <SearchBar key={searchKey} onSearch={handleSearch} />
  
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