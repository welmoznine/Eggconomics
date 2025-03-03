import React from "react";
import StepChart from "./StepChart";

interface PriceTrendsProps {
  priceHistoryByProduct: Record<
    string,
    Array<{ date: string; description: string; regular_price: number }>
  >;
}

const PriceTrends = ({ priceHistoryByProduct }: PriceTrendsProps) => {
  // Flatten priceHistoryByProduct object into a single array
  const combinedPriceHistory = Object.values(priceHistoryByProduct).flat();

  return (
    <div className="bg-card text-card-foreground p-4 sm:p-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Price Trends Over Time
      </h2>
      {combinedPriceHistory.length > 0 ? (
        <StepChart priceHistory={combinedPriceHistory} />
      ) : (
        <p className="text-muted-foreground text-sm">No price history available.</p>
      )}
    </div>
  );
};

export default PriceTrends;