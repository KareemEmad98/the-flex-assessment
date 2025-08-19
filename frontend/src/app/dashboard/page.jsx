// src/app/dashboard/page.jsx
"use client";
import { useState, useEffect } from "react";
import Filters from "@/components/Filters";
import ReviewsTable from "@/components/ReviewsTable";

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchAllReviews() {
      const res = await fetch("/api/reviews", { cache: "no-store" });
      const result = await res.json();
      const reviewsArray = result?.data?.results ?? [];
      setReviews(reviewsArray);
    }
    fetchAllReviews();
  }, []);

  // ✅ Handle approval updates at the top level
  const handleApprovalUpdate = (reviewId, newApprovedStatus) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, approved: newApprovedStatus }
          : review
      )
    );
  };

  // Group reviews by property
  const grouped = reviews.reduce((acc, r) => {
    if (!acc[r.propertyId]) {
      acc[r.propertyId] = {
        propertyName: r.propertyName,
        reviews: []
      };
    }
    acc[r.propertyId].reviews.push(r);
    return acc;
  }, {});

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">
        Manager Dashboard
      </h1>
      <div className="grid gap-8">
        {Object.entries(grouped).map(([propertyId, data]) => (
          <PropertyCard
            key={propertyId}
            propertyId={propertyId}
            propertyName={data.propertyName}
            reviews={data.reviews}
            onApprovalUpdate={handleApprovalUpdate}
          />
        ))}
      </div>
    </div>
  );
}

// -----------------------
// Per-property card
// -----------------------
function PropertyCard({ propertyId, propertyName, reviews, onApprovalUpdate }) {
  const [filters, setFilters] = useState({
    channel: "",
    minRating: "",
    from: "",
    to: ""
  });

  // Apply filters
  const filtered = reviews.filter((r) =>
    (!filters.channel || r.channel === filters.channel) &&
    (!filters.minRating || r.rating >= Number(filters.minRating)) &&
    (!filters.from || new Date(r.date) >= new Date(filters.from)) &&
    (!filters.to || new Date(r.date) <= new Date(filters.to))
  );

  // Metrics
  const avgRating =
    filtered.length > 0
      ? (
          filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length
        ).toFixed(2)
      : "N/A";

  const channels = [...new Set(filtered.map((r) => r.channel))];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {propertyName}
        </h2>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
          <p><span className="font-medium">Total Reviews:</span> {reviews.length}</p>
          <p><span className="font-medium">Filtered Reviews:</span> {filtered.length}</p>
          <p><span className="font-medium">Average Rating:</span> {avgRating}</p>
          <p><span className="font-medium">Channels:</span> {channels.join(", ") || "—"}</p>
        </div>
      </div>

      {/* Per-property filters */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Reviews Table */}
      <div className="mt-4">
        <ReviewsTable reviews={filtered} onApprovalUpdate={onApprovalUpdate} />
      </div>
    </div>
  );
}