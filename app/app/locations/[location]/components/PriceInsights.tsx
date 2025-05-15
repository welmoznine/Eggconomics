"use client";

import React, { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  BadgeDollarSign,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceInsightsProps {
  products: {
    product_id: string;
    description: string;
    regular_price: number | null;
    egg_count: number;
  }[];
  priceHistories: Record<
    string,
    Array<{ date: string; description: string; regular_price: number }>
  >;
}

const PriceInsights = ({ products, priceHistories }: PriceInsightsProps) => {
  // Memoized calculations
  const priceAnalytics = useMemo(() => {
    const validProducts = products.filter((p) => p.regular_price !== null);

    if (validProducts.length === 0) {
      return {
        lowestPrice: { price: 0 },
        highestPrice: { price: 0 },
        averagePrice: 0,
        monthlyTrend: "No Data",
      };
    }

    // Find lowest & highest current priced product
    const lowestPrice = Math.min(...validProducts.map(p => p.regular_price!));
    const highestPrice = Math.max(...validProducts.map(p => p.regular_price!));

    // Calculate average price for products with 12 eggs
    const dozenEggProducts = validProducts.filter((p) => p.egg_count === 12);
    const totalDozenPrice = dozenEggProducts.reduce(
      (sum, p) => sum + (p.regular_price ?? 0),
      0
    );
    const averagePrice =
      dozenEggProducts.length > 0
        ? totalDozenPrice / dozenEggProducts.length
        : 0;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    let monthlyTrend = "No Data";
    
    // For each product, check its price trend using price history
    const productTrends = validProducts.map((product) => {
      const history = priceHistories[product.product_id] || [];
      
      // Get prices from the last month, sorted by date
      const recentPrices = history
        .filter(entry => new Date(entry.date) >= oneMonthAgo)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      if (recentPrices.length >= 2) {
        const firstPrice = recentPrices[0].regular_price;
        const lastPrice = recentPrices[recentPrices.length - 1].regular_price;
        
        if (lastPrice > firstPrice) return "Increasing";
        if (lastPrice < firstPrice) return "Decreasing";
        return "Stable";
      }
      
      return null;
    }).filter(Boolean);
    
    // Determine overall trend based on majority of products
    if (productTrends.length > 0) {
      const increasing = productTrends.filter(t => t === "Increasing").length;
      const decreasing = productTrends.filter(t => t === "Decreasing").length;
      const stable = productTrends.filter(t => t === "Stable").length;
      
      if (increasing > decreasing && increasing > stable) {
        monthlyTrend = "Increasing";
      } else if (decreasing > increasing && decreasing > stable) {
        monthlyTrend = "Decreasing";
      } else {
        monthlyTrend = "Stable";
      }
    }

    return {
      lowestPrice: { price: lowestPrice },
      highestPrice: { price: highestPrice },
      averagePrice,
      monthlyTrend,
    };
  }, [products, priceHistories]);

  const insightCards = [
    {
      title: "Lowest Price",
      value: priceAnalytics.lowestPrice.price,
      icon: TrendingDown,
      iconColor: "text-green-600 dark:text-green-400",
      bgClass: "bg-background",
    },
    {
      title: "Highest Price",
      value: priceAnalytics.highestPrice.price,
      icon: TrendingUp,
      iconColor: "text-red-600 dark:text-red-400",
      bgClass: "bg-background",
    },
    {
      title: "Avg. Price (Per Dozen)",
      value: priceAnalytics.averagePrice,
      icon: BadgeDollarSign,
      iconColor: "text-[#ffc579]",
      bgClass: "bg-background",
    },
    {
      title: "Last Month Trend",
      value: priceAnalytics.monthlyTrend,
      icon: LineChart,
      iconColor:
        priceAnalytics.monthlyTrend === "Increasing"
          ? "text-red-600 dark:text-red-400"
          : priceAnalytics.monthlyTrend === "Decreasing"
            ? "text-green-600 dark:text-green-400"
            : "text-muted-foreground",
      bgClass: "bg-background",
    },
  ];

  return (
    <div className="rounded-lg bg-card text-card-foreground backdrop-blur-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {insightCards.map((card, index) => (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center border border-[#ffc579]",
              card.bgClass
            )}
          >
            <div className="flex items-center mb-2 gap-x-2">
              <card.icon size={28} className={cn(card.iconColor)} />
              <h3 className="text-lg font-medium text-primary">{card.title}</h3>
            </div>

            <p
              className={cn(
                "text-2xl md:text-3xl font-bold py-4",
                card.iconColor
              )}
            >
              {typeof card.value === "number"
                ? `$${card.value.toFixed(2)}`
                : card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceInsights;