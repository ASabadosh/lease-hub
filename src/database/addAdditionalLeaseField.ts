import { createClient } from "@/utils/supabase/client";
import { Lease } from "@/models/Lease";

const supabase = createClient();

export async function addAdditionalLeaseField(lease: Lease) {
  const { data, error} = await supabase.from("additional_lease_fields").insert({ 
    lease_id: lease.id,
    field: "",
    value: "",
    confirmed: false,
    clauses: "",
    }).select().single();


  if (error) {
    console.error("Error adding additional lease field:", error);
  }

  return data;
}
