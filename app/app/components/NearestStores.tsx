"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// Haversine formula to calculate distance between two coordinates
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

interface NearestStoresProps {
  locations: {
    location_id: string;
    location_name: string;
    latitude: number;
    longitude: number;
    latest_timestamp: string;
    avg_regular_price: number | null;
  }[];
}

const NearestStores: React.FC<NearestStoresProps> = ({ locations }) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [nearestStores, setNearestStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          //   console.error("Error getting user location:", error);
          setError(
            "Location access denied. Please enable location in your browser settings."
          );
          setUserLocation(null);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setUserLocation(null);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Calculate distances and sort by nearest
      const sortedStores = locations
        .map((store) => ({
          ...store,
          distance: haversine(
            userLocation.latitude,
            userLocation.longitude,
            store.latitude,
            store.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);

      setNearestStores(sortedStores);
    } else {
      // If no user location, just show the first 5 stores
      setNearestStores(locations.slice(0, 5));
    }

    setLoading(false);
  }, [userLocation, locations]);

  return (
    <div className="col-span-1 bg-accent/50 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-extrabold">Nearest Stores</h3>

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <>
          {error && (
            <p className="text-sm text-red-500 text-center mb-4">{error}</p>
          )}

          <div className="mt-4 space-y-4 ">
            {nearestStores.map((store) => (
              <div
                key={store.location_id}
                className="p-4 bg-card rounded-lg shadow-sm"
              >
                <h4 className="text-md font-medium">{store.location_name}</h4>
                <div className="mt-2">
                  <Link href={`/locations/${store.location_id}`}>
                    <p className="text-sm text-[#ffc579] hover:text-[#ffb64f] flex items-center">
                      View egg prices
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NearestStores;
