import { createClient } from "@/utils/supabase/client";
import { Lease } from "@/models/Lease";

const supabase = createClient();

export async function addAdditionalLeaseField(lease: Lease) {
  const {error} = await supabase.from("additional_lease_fields").insert({ 
    lease_id: lease.id,
    value: "",
    confirmed: false,
    clauses: "",
    });

  if (error) {
    console.error("Error adding additional lease field:", error);
  }
}
