"use client";

export default function KpiCards({ reviews = [] }) {
  const count = reviews.length;
  const avg =
    count === 0
      ? 0
      : Math.round(
          (reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / count) *
            10
        ) / 10;

  const positives =
    count === 0
      ? 0
      : Math.round(
          (reviews.filter((r) => (Number(r.rating) || 0) >= 4).length / count) *
            100
        );

  const now = new Date();
  const last30 = reviews.filter(
    (r) => new Date(r.date) >= new Date(now.getTime() - 30 * 86400000)
  );
  const last30Avg =
    last30.length === 0
      ? 0
      : Math.round(
          (last30.reduce((s, r) => s + (Number(r.rating) || 0), 0) /
            last30.length) *
            10
        ) / 10;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <Card title="Avg Rating" value={avg} suffix="/5" />
      <Card title="Total Reviews" value={count} />
      <Card title="Last 30d Avg" value={last30Avg} suffix="/5" />
      <Card title="% Positive (≥4★)" value={positives} suffix="%" />
    </div>
  );
}

function Card({ title, value, suffix }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">
        {value}
        {suffix && <span className="text-gray-500 text-lg"> {suffix}</span>}
      </div>
    </div>
  );
}
    