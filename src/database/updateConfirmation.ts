import { createClient } from "@/utils/supabase/client";
import { LeaseFieldObject } from "@/models/LeaseFieldObject";

const supabase = createClient();

export async function updateConfirmation(cell: any) {
    const row = cell.getRow().getData();
    const newValue = cell.getValue();
    const sourceTable = row.sourceTable;
    if (sourceTable === "leases") {
        const editedColumn = row.field;
        const { data, error } = await supabase.from("leases").select("*").eq("id", row.id).single();
        if (error) {
            console.error("Error fetching lease field:", error);
        } else {
            data[editedColumn].confirmed = newValue;
            const { error } = await supabase.from("leases").update({ [editedColumn]: data[editedColumn] }).eq("id", row.id);
            if (error) {
            console.error("Error updating lease field:", error);
            }
        }
    } else {
        const { error } = await supabase.from("additional_lease_fields").update({ confirmed: newValue }).eq("id", row.id);
        if (error) {
            console.error("Error updating additioanl lease field:", error);
        }
    }
}
