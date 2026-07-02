
let reviews = []; // { id, tmdbId, author, score, comment, createdAt }

function getReviewsByMovie(tmdbId) {
  return reviews.filter(r => r.tmdbId === tmdbId);
}

function getAvgScore(tmdbId) {
  const movieReviews = getReviewsByMovie(tmdbId);
  if (movieReviews.length === 0) return null;
  const sum = movieReviews.reduce((acc, r) => acc + r.score, 0);
  return sum / movieReviews.length;
}

function addReview({ tmdbId, author, score, comment }) {
  const newReview = {
    id: Date.now(),
    tmdbId,
    author,
    score,
    comment,
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  return newReview;
}

function deleteReview(reviewId) {
  const index = reviews.findIndex(r => r.id === Number(reviewId));
  if (index === -1) return false;
  reviews.splice(index, 1);
  return true;
}

module.exports = {
  getReviewsByMovie,
  getAvgScore,
  addReview,
  deleteReview,
};