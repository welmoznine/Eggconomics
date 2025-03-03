import { createClient } from "./server"; 

export type StoreLocation = {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string | null;
};

export async function fetchLocationDetails(locationId: string) {
  if (!locationId) {
    console.error("Invalid location ID:", locationId);
    return { storeInfo: null };
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.rpc("get_location_details", {
      location_id_param: locationId,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return { storeInfo: null };
    }

    if (!data || data.length === 0) {
      console.warn("No data found for location ID:", locationId);
      return { storeInfo: null };
    }

    const location = data[0];

    return {
      storeInfo: {
        name: location.location_name,
        address: location.address,
        city: location.city,
        state: location.state,
        zipCode: location.zip_code,
        phoneNumber: location.phone,
      },
    };
  } catch (error) {
    console.error("Unexpected error fetching location details:", error);
    return { storeInfo: null };
  }
}
