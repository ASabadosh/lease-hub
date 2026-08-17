import { createClient } from "@/utils/supabase/client";
import { LeaseFieldObject } from "@/models/LeaseFieldObject";

const supabase = createClient();

//property is name of the LeaseFieldObject property being updated
export async function updateDatabase(cell: any, property: keyof LeaseFieldObject) {
    const row = cell.getRow().getData();
    const newValue = cell.getValue();
    const sourceTable = row.sourceTable;
    if (sourceTable === "leases") {
        const editedColumn = row.column;
        const { data, error } = await supabase.from("leases").select("*").eq("id", row.id).single();
        if (error) {
            console.error("Error fetching lease field:", error);
        } else {
            data[editedColumn][property] = newValue;
            const { error } = await supabase.from("leases").update({ [editedColumn]: data[editedColumn] }).eq("id", row.id);
            if (error) {
            console.error("Error updating lease field:", error);
            }
        }
    } else {
        const { error } = await supabase.from("additional_lease_fields").update({ [property]: newValue }).eq("id", row.id);
        if (error) {
            console.error("Error updating additional lease field:", error);
        }
    }
}
