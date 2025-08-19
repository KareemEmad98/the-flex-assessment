// src/components/Filters.jsx
"use client";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      {/* Channel Filter */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Channel
        </label>
        <select
          value={filters.channel}
          onChange={(e) => setFilters({ ...filters, channel: e.target.value })}
          className="w-full border px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          <option value="Airbnb">Airbnb</option>
          <option value="Google">Google</option>
          <option value="Booking.com">Booking.com</option>
        </select>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Min Rating
        </label>
        <select
          value={filters.minRating}
          onChange={(e) =>
            setFilters({ ...filters, minRating: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
      </div>

      {/* From Date */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          From
        </label>
        <input
          type="date"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          className="w-full border px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* To Date */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          To
        </label>
        <input
          type="date"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          className="w-full border px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
