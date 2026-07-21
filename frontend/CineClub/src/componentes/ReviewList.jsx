function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return (<p className="text-slate-400">
      Todavía no hay reseñas para esta película.</p>);
  }

  return (
    <div className="flex flex-col gap-3">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg bg-slate-900 p-4">
          <div className="flex items-center justify-between">
          <strong className="text-slate-100">{review.author}</strong>
          <span className="text-orange-400"> 
            — {'⭐'.repeat(review.score)}
            </span>
          </div>        
          <p className="mt-1 text-slate-300">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;