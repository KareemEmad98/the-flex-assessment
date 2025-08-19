"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PropertyDetails({ property, reviews }) {
  const [activeTab, setActiveTab] = useState("overview");

  const approvedReviews = reviews?.filter(r => r.approved) || [];

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Page header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <p className="text-muted-foreground">
          {property.location} • ID: {property.id} • {property.type}
        </p>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Overview tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p>{property.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Details</h2>
                  <ul className="space-y-1">
                    <li>Rooms: {property.rooms}</li>
                    <li>Bathrooms: {property.bathrooms}</li>
                    <li>Size: {property.size} sqm</li>
                    <li>Amenities: {property.amenities?.join(", ")}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center space-x-4">
                  <img
                    src={property.host?.avatar}
                    alt={property.host?.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{property.host?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {property.host?.contact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Images</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {property.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Property image ${i + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Map</h2>
                  {/* Map placeholder */}
                  <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-muted-foreground">
                    Map Placeholder
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Availability</h2>
                  {/* Calendar placeholder */}
                  <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-muted-foreground">
                    Calendar Placeholder
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Reviews tab */}
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Approved Reviews</h2>
              {approvedReviews.length > 0 ? (
                approvedReviews.map((rev, idx) => (
                  <div key={idx} className="border-b pb-3">
                    <p className="font-medium">{rev.review}</p>
                    <p className="font-medium">
  {"⭐".repeat(rev.rating)} 
</p>
                    <p className="text-sm text-muted-foreground">{rev.date}</p>
                    <p className="mt-2">{rev.channel}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No approved reviews yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
