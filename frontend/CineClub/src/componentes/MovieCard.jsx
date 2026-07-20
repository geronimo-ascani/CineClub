function MovieCard({ movie, onClick }) {
  return (
    <div onClick={() => onClick(movie.id)} 
      className="cursor-pointer overflow-hidden rounded-lg bg-slate-900 transition-transform hover:scale-[1.02]"
    >
      {movie.poster ? (
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="aspect-[2/3] w-full object-cover"
        />
      ) : (
        <div
          className="flex aspect-[2/3] w-full items-center justify-center bg-slate-800 text-sm text-slate-500"
        >
          Sin imagen
        </div>
      )}
       <div className="p-3">
        <h3 className="truncate font-semibold text-slate-100">{movie.title}</h3>
        <p className="text-sm text-slate-400">{movie.year}</p>
        <p className="mt-1 text-sm text-orange-400">
          {movie.avgScore ? `⭐ ${movie.avgScore.toFixed(1)}` : 'Sin reseñas'}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;