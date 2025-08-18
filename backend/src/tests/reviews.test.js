import request from "supertest";
import app from "../index.js"; 

describe("GET /api/reviews/hostaway", () => {
  it("should return all reviews (mock data fallback)", async () => {
    const res = await request(app).get("/api/reviews/hostaway");
    expect(res.statusCode).toBe(200);

    const reviews = res.body.results || res.body.data || res.body;
    expect(reviews).toBeDefined();
    expect(Array.isArray(reviews)).toBe(true);
  });

  it("should filter by propertyId", async () => {
    const res = await request(app).get("/api/reviews/hostaway?propertyId=101");
    expect(res.statusCode).toBe(200);

    const reviews = res.body.results || res.body.data || res.body;
    expect(reviews.every((r) => r.propertyId === "101")).toBe(true);
  });

  it("should validate minRating as a number", async () => {
    const res = await request(app).get("/api/reviews/hostaway?minRating=abc");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("minRating must be a number");
  });

  it("should handle no results gracefully", async () => {
    const res = await request(app).get("/api/reviews/hostaway?propertyId=999");
    expect(res.statusCode).toBe(200);

    const reviews = res.body.results || res.body.data || [];
    expect(reviews.length).toBe(0);
    expect(res.body.message).toBe("No reviews found for the given filters");
  });
});

describe("PATCH /api/reviews/:id/approve", () => {
  it("should approve a review", async () => {
    const res = await request(app)
      .patch("/api/reviews/123/approve")
      .send({ approved: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual({ reviewId: "123", approved: true });
  });

  it("should return 400 for invalid approved value", async () => {
    const res = await request(app)
      .patch("/api/reviews/123/approve")
      .send({ approved: "yes" }); 
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("approved must be true or false");
  });
});

