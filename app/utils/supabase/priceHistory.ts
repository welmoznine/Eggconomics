import { createClient } from "./server";

export type PriceHistoryEntry = {
  date: string;
  description: string;
  regular_price: number;
};

export async function fetchPriceHistory(locationId: string, productId: string) {
  if (!locationId || !productId) {
    console.error("Invalid location ID or product ID:", locationId, productId);
    return { priceHistory: [] };
  }

  const supabase = await createClient();

  try {
    const { data: priceHistory, error } = await supabase.rpc("get_price_history", {
      location_id_param: locationId,
      product_id_param: productId,
    });

    if (error) {
      console.error("Supabase RPC error (price history):", error);
      return { priceHistory: [] };
    }

    return {
      priceHistory: priceHistory.map((entry: { date: string; description: string; regular_price: number }) => ({
        date: entry.date,
        description: entry.description,
        regular_price: Number(entry.regular_price),
      })),
    };
  } catch (error) {
    console.error("Unexpected error fetching price history:", error);
    return { priceHistory: [] };
  }
}
