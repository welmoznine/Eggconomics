import { createClient } from "./server"; 

export type FREDData = {
  observation_date: string; 
  price: number;            
};

export async function fetchFREDData() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_fred_data");

  if (error) {
    console.error("Error fetching FRED data:", error);
    return { fredData: [] };
  }

  return { fredData: data };
}
