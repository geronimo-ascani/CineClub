import { useState, useEffect } from 'react';
import { getMovieDetail } from '../services/api';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

function MovieDetail({ tmdbId, onBack }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovie();
  }, [tmdbId]); // se vuelve a ejecutar si cambia la película seleccionada

  async function loadMovie() {
    setLoading(true);
    setError(null);

    try {
      const data = await getMovieDetail(tmdbId);
      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleReviewAdded() {
    loadMovie();
  }

  if (loading) return <p className="text-slate-400">Cargando película...</p>;
  if (error) return <p className="rounded-lg bg-red-950 px-4 py-3 text-red-300">{error}</p>;
  if (!movie) return null;

  return (
    <div className="flex flex-col gap-6">
      <button 
        onClick={onBack}
        className="w-fit text-sm text-slate-400 transition-colors hover:text-orange-400">
          ← Volver a búsqueda
      </button>

      <div className="flex flex-col gap-6 sm:flex-row">
        {movie.poster && <img 
         src={movie.poster}
         alt={movie.title}
         className="w-full max-w-[220px] rounded-lg object-cover" 
         />}
         
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-100"> 
            {movie.title}{' '}
            <span className="font-normal text-slate-400">({movie.year})</span>
          </h2>

          <p className="text-sm text-slate-400">{movie.genres.join(', ')}</p>
           
         <p className="text-orange-400">
            {movie.avgScore
              ? `⭐ ${movie.avgScore.toFixed(1)} — promedio de ${movie.reviews.length} reseña(s)`
              : 'Sin reseñas'}
          </p>
          <p className="text-slate-300">{movie.overview}</p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-slate-100">Reseñas</h3>
      <ReviewList reviews={movie.reviews} />

      <ReviewForm tmdbId={tmdbId} onReviewAdded={handleReviewAdded} />
    </div>
  );
}

export default MovieDetail;