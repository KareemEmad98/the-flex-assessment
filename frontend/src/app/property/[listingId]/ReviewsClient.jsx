// src/app/property/[listingId]/ReviewsClient.jsx
"use client";

import { useState, useEffect } from "react";
import Filters from "@/components/Filters";
import ReviewsTable from "@/components/ReviewsTable";

export default function ReviewsClient({ listingId }) {
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({
    channel: "",
    minRating: "",
    categoryMin: "",
    from: "",
    to: "",
  });

  useEffect(() => {
  async function fetchReviews() {
    try {
      const res = await fetch(`/api/reviews?listingId=${listingId}`, {
        cache: "no-store",
      });
      const result = await res.json();

      // ✅ drill into result.data.results
      const reviewsArray = result?.data?.results ?? [];

      setReviews(reviewsArray);
      console.log(reviewsArray)
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }
  if (listingId) fetchReviews();
}, [listingId]);


  const filteredReviews = reviews.filter((r) => {
    return (
      (!filters.channel || r.channel === filters.channel) &&
      (!filters.minRating || r.rating >= Number(filters.minRating)) &&
      (!filters.categoryMin || r.categoryScore >= Number(filters.categoryMin)) &&
      (!filters.from || new Date(r.date) >= new Date(filters.from)) &&
      (!filters.to || new Date(r.date) <= new Date(filters.to))
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Reviews for Listing {listingId}
      </h1>

      <Filters filters={filters} setFilters={setFilters} />
      <ReviewsTable
        reviews={filteredReviews}
        onToggle={(id, approved) => {
          console.log("Toggled review:", id, approved);
          // TODO: call backend to update approval
        }}
      />
    </div>
  );
}
