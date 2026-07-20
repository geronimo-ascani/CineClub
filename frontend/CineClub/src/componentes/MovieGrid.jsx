import MovieCard from './MovieCard';

function MovieGrid({ movies, onSelectMovie }) {
  if (movies.length === 0) {
    return( <p className="mt-8 text-center text-slate-400">
              No se encontraron películas
            </p>);
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
      ))}
    </div>
  );
}

export default MovieGrid;