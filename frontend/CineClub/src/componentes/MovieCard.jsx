function MovieCard({ movie, onClick }) {
  return (
    <div onClick={() => onClick(movie.id)} style={{ cursor: 'pointer' }}>
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} />
      ) : (
        <div>Sin imagen</div>
      )}
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <p>
        {movie.avgScore ? `⭐ ${movie.avgScore.toFixed(1)}` : 'Sin reseñas'}
      </p>
    </div>
  );
}

export default MovieCard;