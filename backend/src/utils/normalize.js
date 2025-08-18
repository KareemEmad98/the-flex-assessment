export const normalizeReviews = (data) => {
  return data.map((review) => ({
    id: review.id,
    propertyId: review.propertyId,
    propertyName: review.propertyName || "Unknown",
    channel: review.channel || "Hostaway",
    rating: review.rating,
    type:
      review.rating >= 4
        ? "positive"
        : review.rating <= 2
        ? "negative"
        : "neutral",
    date: review.date,
    review: review.text,
    approved: false,
  }));
};
