import express from "express";
import { getHostawayReviews } from "../services/hostawayService.js";

const router = express.Router();

router.get("/hostaway", async (req, res, next) => {
  try {
    const { propertyId, channel, from, to, minRating, maxRating } = req.query;

    // Validate filters
    if (minRating && isNaN(minRating)) {
      const error = new Error("minRating must be a number");
      error.statusCode = 400;
      throw error;
    }
    if (maxRating && isNaN(maxRating)) {    
      const error = new Error("maxRating must be a number");
      error.statusCode = 400;
      throw error;
    }
    if (from && to && new Date(from) > new Date(to)) {
      const error = new Error("'from' date must be before 'to' date");
      error.statusCode = 400;
      throw error;
    }

    const filters = {
  propertyId, channel, from, to, minRating, maxRating,
  page: req.query.page,
  limit: req.query.limit,
};

    const reviews = await getHostawayReviews(filters);

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({
        message: "No reviews found for the given filters",
        data: [],
      });
    }

    res.status(200).json({ data: reviews });
  } catch (err) {
    next(err); 
  }
});

export default router;

import { setApproval } from "../services/reviewApprovalService.js";

router.patch("/:id/approve", (req, res, next) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    if (typeof approved !== "boolean") {
      const error = new Error("approved must be true or false");
      error.statusCode = 400;
      throw error;
    }

    const result = setApproval(id, approved);
    res.status(200).json({ message: "Approval updated", data: result });
  } catch (err) {
    next(err);
  }
});
