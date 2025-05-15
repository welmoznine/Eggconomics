import { createClient } from "./server";

export type ProductDetails = {
  product_id: string;
  latest_timestamp: string;
  regular_price: string | null;
  promo_price: string | null;
  stock_level: string;
  description: string;
  egg_count: number;
  product_page_url: string;
  image_url: string;
};

export async function fetchProductDetails(locationId: string) {
  if (!locationId) {
    console.error("Invalid location ID:", locationId);
    return { products: [] };
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.rpc("get_product_details", {
      location_id_param: locationId,
    });

    if (error) {
      console.error("Supabase RPC error (products):", error);
      return { products: [] };
    }

    if (!data || data.length === 0) {
      console.warn("No product data found for location ID:", locationId);
      return { products: [] };
    }

    return {
      products: data.map((product: ProductDetails) => ({
        ...product,
        latest_timestamp: new Date(product.latest_timestamp).toISOString(),
      })),
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { products: [] };
  }
}
