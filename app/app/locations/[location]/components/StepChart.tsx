"use client";

import React, { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

interface StepChartProps {
  priceHistory: Array<{
    date: string;
    regular_price: number;
    description: string;
  }>;
}

const StepChart = ({ priceHistory }: StepChartProps) => {
  // Get product names for dropdown
  const productNames = Array.from(
    new Set(priceHistory.map((item) => item.description))
  );

  // Default to the first product
  const [selectedProduct, setSelectedProduct] = useState(productNames[0]);

  // Filter data for the selected product
  const filteredPriceHistory = useMemo(
    () => priceHistory.filter((item) => item.description === selectedProduct),
    [selectedProduct, priceHistory]
  );

  // Format data for recharts
  const formattedData = useMemo(() => {
    return filteredPriceHistory.map(({ date, regular_price }) => ({
      date: new Date(`${date}T00:00:00`).toISOString(), 
      price: regular_price,
    }));
  }, [filteredPriceHistory]);

  // Calculate max price for y-axis 
  const maxPrice = useMemo(() => {
    if (filteredPriceHistory.length === 0) return 0;
    const max = Math.max(
      ...filteredPriceHistory.map((item) => item.regular_price)
    );
    return Math.ceil(max);
  }, [filteredPriceHistory]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 ">
        {/* Dropdown to select product - mobile responsive */}
        <div className="w-full sm:w-auto p-3">
          <p className="text-sm text-muted-foreground mb-1 ">
            Select Product:
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger className="border px-3 py-2 rounded text-sm text-[#ffc579] bg-accent-foreground dark:bg-accent w-full sm:w-auto flex items-center justify-between gap-2">
              <span className="truncate">{selectedProduct}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="max-w-[calc(100vw-2rem)]">
              {productNames.map((product) => (
                <DropdownMenuItem
                  key={product}
                  onClick={() => setSelectedProduct(product)}
                  className="truncate"
                >
                  {product}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Step Chart */}
      {filteredPriceHistory.length > 0 ? (
        <ResponsiveContainer width="100%" height={400} >
          <AreaChart
            data={formattedData}
            margin={{ top: 20, right: 30, left: 30, bottom: 65 }}
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
              tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
              angle={-45}
              textAnchor="end"
              height={10}
              tick={{ fill: "currentColor", fontSize: 12 }} 
              label={{
                position: "insideBottomRight",
                offset: -10,
                fill: "currentColor",
                dy: 50,
              }}
            />

            <YAxis
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              domain={[0, maxPrice]}
              tick={{ fill: "currentColor" }} 
              label={{
                angle: -90,
                position: "insideLeft",
                fill: "currentColor",
                dx: -15,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 24, 39, 0.9)", 
                border: "none",
                borderRadius: "8px",
                color: "#e5e7eb", 
                padding: "10px",
                fontSize: "14px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "#ffc579" }}
              labelStyle={{ fontSize: "14px", color: "#e5e7eb" }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
              labelFormatter={(label) =>
                `Date: ${new Date(label).toLocaleDateString()}`
              }
            />

            <Area
              type="stepAfter"
              dataKey="price"
              stroke="#ffc579"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              dot={{ r: 4, fill: "#ffc579" }}
              activeDot={{ r: 6, fill: "#ffc579" }}
              name={selectedProduct}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-muted-foreground text-sm text-center">
          No price history available.
        </p>
      )}
    </div>
  );
};

export default StepChart;
