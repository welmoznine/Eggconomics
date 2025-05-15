import { createClient } from "./server";

export type Location = {
  location_id: string;
  location_name: string;
  latitude: number;
  longitude: number;
  latest_timestamp: string;
  avg_regular_price: number | null;
};

export async function fetchLocations() {
  const supabase = await createClient();

  // const { data: locations, error } = await supabase.rpc(
  //   "get_locations_and_latest_avg_price_of_dozen_eggs"
  // );
  const { data: locations, error } = await supabase
  .from("egg_location_avg_prices")
  .select("*");


  if (error) {
    console.error("Error fetching locations:", error);
    return { locations: [] };
  }

  const formattedLocations = locations.map((loc: Location) => ({
    location_id: loc.location_id,
    location_name: loc.location_name,
    latitude: Number(loc.latitude),
    longitude: Number(loc.longitude),
    latest_timestamp: loc.latest_timestamp,
    avg_regular_price: loc.avg_regular_price,
  }));

  return { locations: formattedLocations };
}
