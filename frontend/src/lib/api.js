// src/lib/api.js
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

/** Build a query string from an object (skip empty/null). */
function toQuery(params = {}) {
  const u = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    u.set(k, String(v));
  });
  const s = u.toString();
  return s ? `?${s}` : "";
}

/** Fetch normalized, paginated reviews from Hostaway (mocked fallback). */
export async function getReviews(params = {}) {
  const res = await fetch(
    `${API_BASE}/api/reviews/hostaway${toQuery(params)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch reviews: ${res.status} ${text}`);
  }
  return res.json(); // { total, page, limit, results: [...] }
}

/** Approve / unapprove a review by id. */
export async function approveReview(id, approved) {
  const res = await fetch(`${API_BASE}/api/reviews/${id}/approve`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ approved }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to update approval");
  return data;
}
