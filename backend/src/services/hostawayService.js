import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { normalizeReviews } from "../utils/normalize.js";
import dotenv from "dotenv";
import { getApproval } from "./reviewApprovalService.js";

dotenv.config();

const API_KEY = process.env.HOSTAWAY_API_KEY;
const ACCOUNT_ID = process.env.HOSTAWAY_ACCOUNT_ID;

export const getHostawayReviews = async (filters = {}) => {
  try {
    // Call real API
    const url = new URL(`https://api.hostaway.com/v1/reviews`);
    url.searchParams.append("accountId", ACCOUNT_ID);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const result = await response.json();

    let reviews =
      result && result.result && result.result.length > 0
        ? normalizeReviews(result.result)
        : loadMockData();

    // Always inject approval state
    if (Array.isArray(reviews)) {
      reviews = reviews.map(r => ({
        ...r,
        approval: getApproval(r.id) ?? null, // attach approval state
      }));
    } else {
      reviews = {
        ...reviews,
        approval: getApproval(reviews.id) ?? null,
      };
    }

    // Apply filters
    return applyFilters(reviews, filters);
  } catch (err) {
    console.error("Hostaway API error:", err.message);

    let reviews = loadMockData();

    if (Array.isArray(reviews)) {
      reviews = reviews.map(r => ({
        ...r,
        approval: getApproval(r.id) ?? null,
      }));
    } else {
      reviews = {
        ...reviews,
        approval: getApproval(reviews.id) ?? null,
      };
    }

    return applyFilters(reviews, filters);
  }
};

// Mock loader
const loadMockData = () => {
  const filePath = path.resolve("mock-data/hostaway-reviews.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);
  return normalizeReviews(data);
};

// Filtering function
const applyFilters = (
  reviews,
  { propertyId, channel, from, to, minRating, maxRating, page, limit }
) => {
  let filtered = reviews.filter((r) => {
    if (propertyId && r.propertyId !== propertyId) return false;
    if (channel && r.channel.toLowerCase() !== channel.toLowerCase()) return false;
    if (from && new Date(r.date) < new Date(from)) return false;
    if (to && new Date(r.date) > new Date(to)) return false;
    if (minRating && r.rating < Number(minRating)) return false;
    if (maxRating && r.rating > Number(maxRating)) return false;
    return true;
  });

  // --- Pagination logic ---
  const pageNum = Number(page) || 1;
  const pageSize = Number(limit) || 10;
  const start = (pageNum - 1) * pageSize;
  let paginated = filtered.slice(start, start + pageSize);

  // 🔑 Always re-inject approval state here
  paginated = paginated.map((r) => ({
    ...r,
    approved: getApproval(r.id) ?? false, // use the in-memory Map
  }));

  return {
    total: filtered.length,
    page: pageNum,
    limit: pageSize,
    results: paginated,
  };
};