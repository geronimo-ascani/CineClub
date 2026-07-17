import MovieCard from './MovieCard';

function MovieGrid({ movies, onSelectMovie }) {
  if (movies.length === 0) {
    return <p>No se encontraron películas</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
      ))}
    </div>
  );
}

export default MovieGrid;