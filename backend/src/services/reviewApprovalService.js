// Simple in-memory map: { reviewId: boolean }
const approvals = new Map();

export const setApproval = (reviewId, approved) => {
  approvals.set(reviewId, approved);
  return { reviewId, approved };
};

export const getApproval = (reviewId) => approvals.get(reviewId) || false;
