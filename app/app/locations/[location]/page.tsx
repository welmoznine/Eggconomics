import StoreInformation from "./components/StoreInformation";
import PriceTrends from "./components/PriceTrends";
import PricesTable from "./components/PricesTable";
import { notFound } from "next/navigation";
import { fetchLocationDetails } from "@/utils/supabase/locationDetails";
import { fetchProductDetails, ProductDetails } from "@/utils/supabase/productDetails";
import { fetchPriceHistory } from "@/utils/supabase/priceHistory";
import PriceInsights from "./components/PriceInsights";

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

export default async function LocationPage({ params }: LocationPageProps) {
  const resolvedParams = await params; // Get the location_id
  
  const { storeInfo } = await fetchLocationDetails(resolvedParams.location);
  if (!storeInfo) {
    notFound();
  }

  const { products } = await fetchProductDetails(resolvedParams.location);


  const priceHistories = await Promise.all(
    products.map(async (product: ProductDetails) => {
      const { priceHistory } = await fetchPriceHistory(resolvedParams.location, product.product_id);
      return { product_id: product.product_id, priceHistory };
    })
  );

  // Convert price history into a structured object
  const priceHistoryByProduct: Record<string, Array<{ date: string; description: string; regular_price: number }>> =
    Object.fromEntries(priceHistories.map(({ product_id, priceHistory }) => [product_id, priceHistory]));

  return (
    <main className="w-full min-h-full flex flex-col items-center px-4 md:px-8 bg-background">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">{storeInfo.name}</h1>
        </div>
        <StoreInformation storeInfo={storeInfo}   />
        <PriceInsights products={products} priceHistories={priceHistoryByProduct} /> 
        <PriceTrends priceHistoryByProduct={priceHistoryByProduct} />
        <PricesTable products={products} />
      </div>
    </main>
  );
}
