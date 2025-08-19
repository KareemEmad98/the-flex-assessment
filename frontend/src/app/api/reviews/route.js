import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("listingId");
    const channel = searchParams.get("channel");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const minRating = searchParams.get("minRating");
    const maxRating = searchParams.get("maxRating");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const query = new URLSearchParams({
      ...(propertyId && { propertyId }),
      ...(channel && { channel }),
      ...(from && { from }),
      ...(to && { to }),
      ...(minRating && { minRating }),
      ...(maxRating && { maxRating }),
      ...(page && { page }),
      ...(limit && { limit }),
    });

    const backendRes = await fetch(`${BACKEND_URL}/api/reviews/hostaway?${query}`, {
      method: "GET",
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: `Backend error: ${backendRes.statusText}` },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch reviews", details: err.message },
      { status: 500 }
    );
  }
}
