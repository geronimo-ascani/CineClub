const BASE_URL = import.meta.env.VITE_API_URL;

export async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/api/movies/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error('Error al buscar películas');
  }

  return response.json();
}

export async function getMovieDetail(tmdbId) {
  const response = await fetch(`${BASE_URL}/api/movies/${tmdbId}`);

  if (response.status === 404) {
    throw new Error('Película no encontrada');
  }

  if (!response.ok) {
    throw new Error('Error al obtener la película');
  }

  return response.json();
}

export async function addReview(tmdbId, reviewData) {
  const response = await fetch(`${BASE_URL}/api/movies/${tmdbId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error('Error al agregar la reseña');
  }

  return response.json();
}

export async function deleteReview(reviewId) {
  const response = await fetch(`${BASE_URL}/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la reseña');
  }
}