"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ProductDetails } from "@/utils/supabase/productDetails";
import Image from "next/image";

type PricesTableProps = {
  products: ProductDetails[];
};

const PricesTable: React.FC<PricesTableProps> = ({ products }) => (
  <div className="bg-card text-card-foreground p-3 sm:p-5  ">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">
      Current Egg Prices
    </h2>
    <h3 className="text-xs sm:text-sm md:text-base text-[#ffc579] mb-3 text-right">
      Last updated:{" "}
      {new Date(products[0].latest_timestamp).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </h3>

    <div className="overflow-x-auto border">
      <div className="inline-block min-w-full align-middle ">
        <table className="min-w-full divide-y divide-border ">
          <thead>
            <tr className="text-[10px] sm:text-xs md:text-sm">
              <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-medium text-primary  uppercase tracking-wider">
                Image
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-medium text-primary uppercase tracking-wider">
                Product
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-medium text-primary  uppercase tracking-wider">
                Size
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-medium text-primary uppercase tracking-wider">
                Regular Price
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-medium text-primary  uppercase tracking-wider">
                Promo Price
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-medium text-primary  uppercase tracking-wider">
                Stock Level
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-medium text-primary  uppercase tracking-wider">
                Product Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index} className="text-[10px] sm:text-xs md:text-sm">
                  <td className="px-2 sm:px-4 py-1 sm:py-3">
                    <Image
                      src={product.image_url}
                      alt={product.description}
                      width={40} 
                      height={40} 
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 whitespace-nowrap overflow-hidden text-ellipsis w-full sm:max-w-none">
                    {product.description}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 whitespace-nowrap">
                    {product.egg_count} ct
                  </td>

                  <td className="px-2 sm:px-4 py-1 sm:py-3">
                    {product.regular_price
                      ? `$${product.regular_price}`
                      : "N/A"}
                  </td>
                  <td
                    className={`px-2 sm:px-4 py-1 sm:py-3 ${
                      product.promo_price
                        ? "text-green-600 dark:text-green-400"
                        : ""
                    }`}
                  >
                    {product.promo_price ? `$${product.promo_price}` : "-"}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 whitespace-nowrap overflow-hidden text-ellipsis w-full sm:max-w-none">
                    <Badge
                      className={`text-[9px] sm:text-[10px] md:text-xs ${
                        product.stock_level === "HIGH"
                          ? "bg-green-500 text-white"
                          : product.stock_level === "TEMPORARILY_OUT_OF_STOCK"
                            ? "bg-red-500 text-white"
                            : product.stock_level === "LOW"
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-500 text-white"
                      }`}
                    >
                      {product.stock_level === "TEMPORARILY_OUT_OF_STOCK"
                        ? "OUT OF STOCK"
                        : product.stock_level.replace(/_/g, " ")}
                    </Badge>
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-none">
                    <a
                      href={product.product_page_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-[9px] sm:text-[10px] md:text-xs"
                    >
                      View Product
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-2 sm:px-4 py-3 text-center text-muted-foreground text-[10px] sm:text-xs md:text-sm"
                >
                  No egg prices available at this time.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default PricesTable;
