import React from "react";
import FredGraph from "./FredGraph";
import { fetchFREDData, FREDData } from "@/utils/supabase/fredData";

export default async function TrendSection() {
  const { fredData } = await fetchFREDData();

  // Filter data to include only observations from the year 2000 onward
  const filteredData: FREDData[] = fredData.filter((row: FREDData) => {
    const year = new Date(`${row.observation_date}T00:00:00`).getFullYear();
    return year >= 2000;
  });

  const eggData = filteredData.map((row) => {
    const rawDate = new Date(`${row.observation_date}T00:00:00`);
    return {
      date: rawDate.toLocaleDateString(),
      price: row.price,
      rawDate,
    };
  });

  const sortedData = [...eggData].sort(
    (a, b) => a.rawDate.getTime() - b.rawDate.getTime()
  );

  // Calculate (latest) current price
  const currentPrice =
    sortedData.length > 0 ? sortedData[sortedData.length - 1].price : 0;

  // Calculate  yearly change
  let yearlyChange = 0;
  if (sortedData.length > 0) {
    const currentDate = sortedData[sortedData.length - 1].rawDate;
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    let closest = sortedData[0];
    let minDiff = Math.abs(closest.rawDate.getTime() - oneYearAgo.getTime());
    sortedData.forEach((dataPoint) => {
      const diff = Math.abs(dataPoint.rawDate.getTime() - oneYearAgo.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closest = dataPoint;
      }
    });
    yearlyChange = currentPrice - closest.price;
  }

  // Calculate max price
  const maxPrice =
    eggData.length > 0 ? Math.max(...eggData.map((data) => data.price)) : 0;

  return (
    <div className="mt-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#ffc579] uppercase tracking-wide">
            Price Trends
          </h2>
          <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Monitor egg prices over time
          </p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
            Visualize how the cost of eggs has changed with real market data.
          </p>
        </div>

        <div className="mt-6">
          <div className="bg-card text-card-foreground  rounded-lg overflow-hidden">
            <div className="px-4 sm:p-6">
              <FredGraph
                eggData={eggData}
                currentPrice={currentPrice}
                yearlyChange={yearlyChange}
                maxPrice={maxPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
