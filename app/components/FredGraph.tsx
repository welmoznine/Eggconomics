"use client";

import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export interface EggPriceData {
  date: string;
  price: number;
  rawDate: Date;
}

interface FredGraphProps {
  eggData: EggPriceData[];
  currentPrice: number;
  yearlyChange: number;
  maxPrice: number;
}

const FredGraph: React.FC<FredGraphProps> = ({
  eggData,
  currentPrice,
  yearlyChange,
  maxPrice,
}) => {
  const formattedCurrentPrice = currentPrice.toFixed(2);
  const formattedYearlyChange = Math.abs(yearlyChange).toFixed(2);

  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <div className="overflow-hidden">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={eggData}
            margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc579" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc579" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="date"
              tickFormatter={(tick) => String(new Date(tick).getFullYear())}
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              domain={[0, maxPrice]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 24, 39, 0.9)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                padding: "10px",
                fontSize: "14px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "#ffc579" }}
              labelStyle={{ fontSize: "14px", color: "#e5e7eb" }}
              formatter={(value: number) => [
                `$${value.toFixed(2)}`,
                "Average Price",
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#ffc579"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div>
          <p className="mb-6 text-xl font-semibold text-gray-500 text-center">
            The average price of a dozen eggs is{" "}
            <span className="font-bold text-[#ffc579]">
              ${formattedCurrentPrice}
            </span>
            ,{" "}
            {yearlyChange >= 0 ? (
              <span>
                an increase of{" "}
                <span className="font-bold text-red-500">
                  ${formattedYearlyChange}{" "}
                  <TrendingUpIcon className="inline w-5 h-5" />
                </span>
              </span>
            ) : (
              <span>
                a decrease of{" "}
                <span className="font-bold text-green-500">
                  ${formattedYearlyChange}{" "}
                  <TrendingDownIcon className="inline w-5 h-5" />
                </span>
              </span>
            )}{" "}
            from the same time last year.
          </p>

          <p className="text-xs text-gray-400 py-2 border-t border-gray-300 italic">
            <strong>Note:</strong> The data above represents the U.S. city
            average cost of a dozen large white, Grade A chicken eggs, as
            reported by the{" "}
            <Link
              href="https://data.bls.gov/timeseries/APU0000708111"
              className="underline text-blue-600 hover:text-blue-800"
            >
              U.S. Bureau of Labor Statistics
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default FredGraph;
