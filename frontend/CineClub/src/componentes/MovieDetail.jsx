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

  if (loading) return <p>Cargando película...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!movie) return null;

  return (
    <div className="movie-detail">
      <button onClick={onBack}>← Volver a búsqueda</button>

      <div className="movie-header">
        {movie.poster && <img src={movie.poster} alt={movie.title} />}
        <div>
          <h2>{movie.title} ({movie.year})</h2>
          <p>{movie.genres.join(', ')}</p>
          <p>
            {movie.avgScore
              ? `⭐ ${movie.avgScore.toFixed(1)} — promedio de ${movie.reviews.length} reseña(s)`
              : 'Sin reseñas'}
          </p>
          <p>{movie.overview}</p>
        </div>
      </div>

      <h3>Reseñas</h3>
      <ReviewList reviews={movie.reviews} />

      <ReviewForm tmdbId={tmdbId} onReviewAdded={handleReviewAdded} />
    </div>
  );
}

export default MovieDetail;