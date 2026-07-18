import { useState } from 'react';
import { addReview } from '../services/api';

function ReviewForm({ tmdbId, onReviewAdded }) {
  const [author, setAuthor] = useState('');
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!author.trim() || !comment.trim()) {
      setError('Completá tu nombre y un comentario antes de enviar.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const newReview = await addReview(tmdbId, {
        author: author.trim(),
        score: Number(score),
        comment: comment.trim(),
      });

      onReviewAdded(newReview); 

      setAuthor('');
      setScore(5);
      setComment('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar reseña</h3>

      <label>
        Tu nombre
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>

      <label>
        Puntaje
        <select value={score} onChange={(e) => setScore(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>

      <label>
        Comentario
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Enviar reseña'}
      </button>
    </form>
  );
}

export default ReviewForm;