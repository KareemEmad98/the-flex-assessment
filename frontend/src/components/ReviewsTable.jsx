// src/components/ReviewsTable.jsx
"use client";

export default function ReviewsTable({ reviews, onApprovalUpdate }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews found.</p>;
  }

  const toggleApproval = async (id, currentApproved) => {
    try {
      const res = await fetch(`/api/reviews/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: !currentApproved }),
      });

      if (!res.ok) {
        throw new Error("Failed to update approval status");
      }

      const updatedReview = await res.json();
      
      // Extract the new approved status from the response
      const newApprovedStatus = updatedReview.approved || 
                               updatedReview.data?.approved || 
                               !currentApproved;
      
      // Update the parent state instead of local state
      onApprovalUpdate(id, newApprovedStatus);
      
    } catch (err) {
      console.error("Approval toggle error:", err);
      // Optionally show user-friendly error message
    }
  };

  return (
    <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border border-gray-300 px-2 py-2">Property</th>
          <th className="border border-gray-300 px-2 py-2">Channel</th>
          <th className="border border-gray-300 px-2 py-2">Rating</th>
          <th className="border border-gray-300 px-2 py-2">Date</th>
          <th className="border border-gray-300 px-2 py-2">Review</th>
          <th className="border border-gray-300 px-2 py-2">Approved</th>
        </tr>
      </thead>
      <tbody className="bg-white text-gray-900">
        {reviews.map((r, index) => (
          <tr key={r.id || `review-${index}`} className="hover:bg-gray-100 transition">
            <td className="border border-gray-300 px-2 py-2">{r.propertyName}</td>
            <td className="border border-gray-300 px-2 py-2">{r.channel}</td>
            <td className="border border-gray-300 px-2 py-2">{r.rating}</td>
            <td className="border border-gray-300 px-2 py-2">{r.date}</td>
            <td className="border border-gray-300 px-2 py-2">{r.review}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">
              <button
                onClick={() => toggleApproval(r.id, r.approved)}
                className={`px-3 py-1 rounded text-white transition-colors ${
                  r.approved ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {r.approved ? "Approved" : "Unapproved"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}