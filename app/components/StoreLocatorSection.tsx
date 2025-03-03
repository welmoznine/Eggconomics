"use client";

import React from "react";
import NearestStores from "./NearestStores";
import MapWrapper from "./MapWrapper";

interface StoreLocatorSectionProps {
  locations: {
    location_id: string;
    location_name: string;
    latitude: number;
    longitude: number;
    latest_timestamp: string;
    avg_regular_price: number | null;
  }[];
}

const StoreLocatorSection: React.FC<StoreLocatorSectionProps> = ({ locations }) => {
  return (
    <section className="mt-4 pt-12 pb-8 bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#ffc579] uppercase tracking-wide">
            Store Locator
          </h2>
          <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Find egg prices near you
          </p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
            Use our interactive map to find stores with the best egg prices in
            your area.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <NearestStores locations={locations} />

          <div className="col-span-1 lg:col-span-2 overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[450px] ">
            <div className="w-full h-[450px] flex items-center justify-center shadow-md">
              <MapWrapper locations={locations} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocatorSection;