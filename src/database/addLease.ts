
import { createClient } from "@/utils/supabase/client";
import { Lease } from "@/models/Lease";
import Anthropic from "@anthropic-ai/sdk";

type ParsedField = {
  value: string;
  clauses: string;
};

const supabase = createClient();

export async function addLease(response: Anthropic.Message, title: String) {
  for (const block of response.content) {
            if (block.type === "text") {
                const parsed = JSON.parse(block.text);
                const newLease: Record<string, unknown> = {
                    title,
                };
                for (const [field, value] of Object.entries(parsed)) {
                    if(value === null) {
                        newLease[field] = {
                            field: field,
                            value: "Field not Found",
                            confirmed: false,
                            clauses: "",
                        }
                    } else {
                        const parsedField = value as ParsedField;
                        newLease[field] = {
                            field: field,
                            value: parsedField.value,
                            confirmed: false,
                            clauses: parsedField.clauses,
                        }
                    }
                }
                const { error } = await supabase.from("leases").insert(newLease);
                if (error) {
                    console.error("Error adding lease", error);
                }
            }
        }
}
