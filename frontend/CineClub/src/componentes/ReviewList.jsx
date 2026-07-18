function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p>Todavía no hay reseñas para esta película.</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <strong>{review.author}</strong>
          <span> — {'⭐'.repeat(review.score)}</span>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;