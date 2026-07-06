const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w342';


function mapMovieSummary(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? movie.release_date.split('-')[0] : null,
    poster: movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : null,
  };
}

function mapMovieDetail(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? movie.release_date.split('-')[0] : null,
    poster: movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : null,
    overview: movie.overview,
    runtime: movie.runtime,
    genres: movie.genres ? movie.genres.map(g => g.name) : [],
  };
}


async function searchMovies(query) {
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=es-AR`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error al buscar en TMDB');
  }

  const data = await response.json();
  return data.results.map(mapMovieSummary);
}

async function getMovieById(tmdbId) {
  const url = `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=es-AR`;
  const response = await fetch(url);

  if (response.status === 404) {
    return null; 
  }

  if (!response.ok) {
    throw new Error('Error al obtener película de TMDB');
  }

  const movie = await response.json();
  return mapMovieDetail(movie);
}

module.exports = {
  searchMovies,
  getMovieById,
};