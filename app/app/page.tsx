import Hero from "./components/HeroSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import StoreLocatorSection from "@/app/components/StoreLocatorSection";
import TrendSection from "@/app/components/TrendSection";
import { fetchLocations } from "@/utils/supabase/locations";

export default async function Home() {
  const { locations } = await fetchLocations();

  return (
    <main className="flex flex-col flex-1 items-center justify-center w-full">
      <Hero locations={locations} />
      <FeaturesSection />
      <TrendSection />
      <StoreLocatorSection locations={locations} />
    </main>
  );
}
