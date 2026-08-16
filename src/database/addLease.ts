
import { createClient } from "@/utils/supabase/client";
import { Lease } from "@/models/Lease";
import Anthropic from "@anthropic-ai/sdk";

type ParsedField = {
  value: string;
  clauses: string;
};

const supabase = createClient();

export async function addLease(response1: Anthropic.Message, response2: Anthropic.Message, title: String) {
    const newLease: Record<string, unknown> = { title };
    const responses = [response1, response2]
    for(const response of responses) {
        for (const block of response.content) {
            if (block.type != "text") {
                continue;
            }
            const parsed = JSON.parse(block.text);
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
        }
    }
    const { error } = await supabase.from("leases").insert(newLease);
    if (error) {
        console.error("Error adding lease", error);
    }
}
