require('dotenv').config();
const express = require('express');
const reviewsStore = require('./reviews');
const tmdbService = require('./tmdbService');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/api/movies/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'El parámetro q es requerido' });
  }

  try {
    const results = await tmdbService.searchMovies(q);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al conectar con TMDB' });
  }
});


app.get('/api/movies/:tmdbId', async (req, res) => {
  const { tmdbId } = req.params;

  try {
    const movieData = await tmdbService.getMovieById(tmdbId);

    if (!movieData) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    res.json({
      ...movieData,
      reviews: reviewsStore.getReviewsByMovie(tmdbId),
      avgScore: reviewsStore.getAvgScore(tmdbId),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al conectar con TMDB' });
  }
});


app.post('/api/movies/:tmdbId/reviews', (req, res) => {
  const { tmdbId } = req.params;
  const { author, score, comment } = req.body;

  if (!author || !score || !comment) {
    return res.status(400).json({ error: 'author, score y comment son obligatorios' });
  }

  const numericScore = Number(score);
  if (isNaN(numericScore) || numericScore < 1 || numericScore > 5) {
    return res.status(400).json({ error: 'score debe ser un número entre 1 y 5' });
  }

  const newReview = reviewsStore.addReview({ tmdbId, author, score: numericScore, comment });
  res.status(201).json(newReview);
});


app.delete('/api/reviews/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  const deleted = reviewsStore.deleteReview(reviewId);

  if (!deleted) {
    return res.status(404).json({ error: 'Reseña no encontrada' });
  }

  res.status(204).send();
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});