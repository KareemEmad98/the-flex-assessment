"use client";

export default function Pagination({ page, limit, total, onPageChange, onLimitChange }) {
  const lastPage = Math.max(1, Math.ceil((total || 0) / (limit || 10)));

  return (
    <div className="flex items-center justify-between gap-3 mt-4">
      <div className="text-sm text-gray-600">
        Page <b>{page}</b> of <b>{lastPage}</b> • Total <b>{total || 0}</b>
      </div>

      <div className="flex items-center gap-2">
        <select
          className="border rounded-md p-2 text-sm"
          value={limit}
          onChange={(e) => onLimitChange?.(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>{n} / page</option>
          ))}
        </select>

        <button
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page >= lastPage}
          onClick={() => onPageChange?.(page + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
