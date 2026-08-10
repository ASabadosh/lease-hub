
import { createClient } from "@/utils/supabase/client";
import { Lease } from "@/models/Lease";
import Anthropic from "@anthropic-ai/sdk";

const supabase = createClient();

export async function addLease(response: Anthropic.Message, title: String) {
  for (const block of response.content) {
            if (block.type === "text") {
                const parsed = JSON.parse(block.text);
                const { error } = await supabase.from("additional_lease_fields").insert({ 
                    title: title,
                    "Premises" : {
                        field: "Premises",
                        value: parsed["Premises"].value,
                        confirmed: false,
                        clauses: parsed["Premises"].clauses,
                    },
                    "Term": {
                        field: "Term",
                        value: parsed["Term"].value,
                        confirmed: false,
                        clauses: parsed["Term"].clauses,
                    },
                      "Rent": {
                        field: "Rent",
                        value: parsed["Rent"].value,
                        confirmed: false,
                        clauses: parsed["Rent"].clauses,
                    },
                      "Security Deposit": {
                        field: "Security Deposit",
                        value: parsed["Security Deposit"].value,
                        confirmed: false,
                        clauses: parsed["Security Deposit"].clauses,
                    },
                      "Maintenance and Repairs": {
                        field: "Maintenance and Repairs",
                        value: parsed["Maintenance and Repairs"].value,
                        confirmed: false,
                        clauses: parsed["Maintenance and Repairs"].clauses,
                    },
                      "Utilities": {
                        field: "Utilities",
                        value: parsed["Utilities"].value,
                        confirmed: false,
                        clauses: parsed["Utilities"].clauses,
                    },
                      "Insurance": {
                        field: "Insurance",
                        value: parsed["Insurance"].value,
                        confirmed: false,
                        clauses: parsed["Insurance"].clauses,
                    },
                      "Taxes": {
                        field: "Taxes",
                        value: parsed["Taxes"].value,
                        confirmed: false,
                        clauses: parsed["Taxes"].clauses,
                    },
                      "Surrender": {
                        field: "Surrender",
                        value: parsed["Surrender"].value,
                        confirmed: false,
                        clauses: parsed["Surrender"].clauses,
                    },
                      "Holding Over": {
                        field: "Holding Over",
                        value: parsed["Holding Over"].value,
                        confirmed: false,
                        clauses: parsed["Holding Over"].clauses,
                    },
                      "Option to Extend Lease": {
                        field: "Option to Extend Lease",
                        value: parsed["Option to Extend Lease"].value,
                        confirmed: false,
                        clauses: parsed["Option to Extend Lease"].clauses,
                    },
                      "Notices":{
                        field: "Notices",
                        value: parsed["Notices"].value,
                        confirmed: false,
                        clauses: parsed["Notices"].clauses,
                    },
                      "Attorney Fees": {
                        field: "Attorney Fees",
                        value: parsed["Attorney Fees"].value,
                        confirmed: false,
                        clauses: parsed["Attorney Fees"].clauses,
                    },
                });
                if (error) {
                    console.error("Error adding lease", error);
                }
            }
        }

}
