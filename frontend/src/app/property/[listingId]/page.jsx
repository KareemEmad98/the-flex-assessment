import PropertyDetails from "@/components/PropertyDetails";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export default async function PropertyPage({ params }) {
  const requestId = Math.random().toString(36).substring(2); // Unique ID for this render
  console.log(`[${requestId}] PropertyPage rendered with params:`, params);

  // Await params to resolve the Promise
  const resolvedParams = await params;
  const { listingId } = resolvedParams || {};

  // Check if listingId is defined
  if (!listingId) {
    console.error(`[${requestId}] Error: Property ID not provided`);
    return (
      <div>
        <h1>Error: Property ID not provided</h1>
        <p>Please ensure a valid property ID is included in the URL.</p>
      </div>
    );
  }

  // Use absolute URL for fetch
  console.log(`[${requestId}] Fetching /api/reviews?listingId=${listingId}`);
  const res = await fetch(`${FRONTEND_URL}/api/reviews?listingId=${listingId}`, {
    cache: "no-store", // Consider changing to { next: { revalidate: 60 } } if caching is acceptable
  });

  console.log(`[${requestId}] Fetch response status: ${res.status}`);

  if (!res.ok) {
    console.error(`[${requestId}] Failed to fetch reviews, status: ${res.status}`);
    return (
      <div>
        <h1>Failed to fetch reviews.</h1>
        <p>Unable to load reviews at this time. Please try again later.</p>
      </div>
    );
  }

  const data = await res.json();
  const reviews = data?.data?.results ?? [];
  console.log(`[${requestId}] Reviews fetched: ${reviews.length} reviews`);

  // Build property info from first review (or mock if needed)
  const property = reviews.length > 0
    ? {
        id: listingId,
        name: reviews[0].propertyName || "Unknown Property",
        location: reviews[0].location || "London, UK",
        type: "Apartment",
        description: "Modern apartment in the heart of the city.",
        rooms: 2,
        bathrooms: 1,
        size: 65,
        amenities: ["Wi-Fi", "Kitchen", "TV", "Washer"],
        host: {
          name: "John Doe",
          contact: "john@example.com",
          avatar: "/avatar.png",
        },
        images: ["/img1.jpeg", "/img2.jpeg", "/img3.jpeg"],
      }
    : {
        id: listingId,
        name: "Unknown Property",
        location: "N/A",
        type: "N/A",
        description: "No description available.",
        rooms: 0,
        bathrooms: 0,
        size: 0,
        amenities: [],
        host: {
          name: "-",
          contact: "-",
          avatar: "/avatar.png",
        },
        images: [],
      };

  return <PropertyDetails property={property} reviews={reviews} />;
}