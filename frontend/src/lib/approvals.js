// src/lib/approvals.js
const KEY = "flx_approvals_v1";

function readStore() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(obj) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(obj));
}

export function getApprovalOverlay() {
  return readStore(); // { [reviewId]: boolean }
}

export function setApprovalOverlay(reviewId, approved) {
  const s = readStore();
  s[reviewId] = approved;
  writeStore(s);
}

export function mergeApproval(results = []) {
  const overlay = getApprovalOverlay();
  return results.map((r) =>
    typeof overlay[r.id] === "boolean" ? { ...r, approved: overlay[r.id] } : r
  );
}
