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
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg bg-slate-900 p-5"
      >
      <h3 className="text-lg font-semibold text-slate-100">Agregar reseña</h3>

      <label className="text-lg font-semibold text-slate-100">
        Tu nombre
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
           className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Puntaje
        <select value={score} onChange={(e) => setScore(e.target.value)}
           className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-orange-500"
           >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Comentario
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500"
        />
      </label>

      {error && 
      <p className="rounded-lg bg-red-950 px-3 py-2 text-sm text-red-300">
        {error}
      </p>}

      <button 
      type="submit" 
      disabled={submitting}
      className="rounded-lg bg-orange-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50">
        {submitting ? 'Enviando...' : 'Enviar reseña'}
      </button>
    </form>
  );
}

export default ReviewForm;