import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export async function PATCH(req, context) {
  try {
    // 👇 await params here
    const { id } = await context.params;
    const body = await req.json();
    console.log("Making request to:", BACKEND_URL);
    const backendRes = await fetch(`${BACKEND_URL}/api/reviews/${id}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!backendRes.ok) {
      throw new Error(`Backend error: ${backendRes.status}`);
    }

    const data = await backendRes.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

