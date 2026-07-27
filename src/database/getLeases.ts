import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getLeases() {
  const {data, error} = await supabase.from("leases").select("*");

  if (error) {
    console.error("Error fetching leases:", error);
  }

  return data;
}