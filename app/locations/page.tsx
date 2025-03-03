import { fetchLocations } from "@/utils/supabase/locations";
import MapWrapper from "@/app/components/MapWrapper";

export default async function MapPage() {
  const { locations } = await fetchLocations();

  return (
    <main className="flex flex-col flex-1 w-full min-h-full">
      <div className="w-full h-[calc(100vh-64px)] flex items-stretch justify-center">
        <MapWrapper locations={locations} />
      </div>
    </main>
  );
}
