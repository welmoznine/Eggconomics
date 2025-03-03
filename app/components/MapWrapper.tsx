"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

interface LocationMapProps {
  locations: {
    location_id: string;
    location_name: string;
    latitude: number;
    longitude: number;
    latest_timestamp: string;
    avg_regular_price: number | null;
  }[];
}

export default function MapWrapper({ locations }: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  const LocationMap = dynamic(() => import("@/components/LocationMap"), {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p>Loading map...</p>
      </div>
    ),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <LocationMap locations={locations} />
    </div>
  );
}