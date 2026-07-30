import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getAdditionalLeaseFields() {
  const {data, error} = await supabase.from("additional_lease_fields").select("*");

  if (error) {
    console.error("Error fetching additional lease fields:", error);
  }

  return data;
}
