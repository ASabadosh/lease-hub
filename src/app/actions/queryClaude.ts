"use server"
import Anthropic from "@anthropic-ai/sdk";
import { addLease } from "@/database/addLease";

const fieldSchema = {
    "anyOf": [
    {
    type: "object",
    properties: {
        value: { type: "string" },
        clauses: { type: "string" },
    },
    required: ["value", "clauses"],
    additionalProperties: false,
    },
    {
        type: "null",
    }
    ]
}

export default async function QueryClaude(formData: FormData) {

        const title = formData.get("lease-title") as string;
        const lease = formData.get("lease-pdf") as File;

        if((lease.size / (1024 * 1024)) > 20) {
            alert("Pdf must be under 20 MB");
            return;
        }

        const client = new Anthropic();
        const arrayBuffer = await lease.arrayBuffer();
        const pdfBase64 = Buffer.from(arrayBuffer).toString("base64");



        const response = await client.messages.create({   
            model: "claude-sonnet-5", 
            max_tokens: 4096,   
            messages: [ {       
                role: "user",       
                content: [
                    {
                        type: "document",           
                        source: {             
                            type: "base64",             
                            media_type: "application/pdf",             
                            data: pdfBase64           
                        }
                    }, 
                    {
                        type: "text",  
                        text:'Use the information in the given lease pdf to fill out the given json structure.  For each property\n   "term",\n    "rent",\n    "premises",\n    "security_deposit",\n    "maintenance_and_repairs",\n    "utilities",\n    "insurance",\n    "taxes",\n    "surrender",\n    "holding_over:",\n    "option_to_extend_lease",\n    "notices",\n    "attorney_fees")\nfill out the value property with the corresponding information from the lease and the clauses property with the source clauses for the extracted information. If the property is not specified in the lease, fill it in with null.\n\nFormat:\n- fill in clauses property like this: 16.16.2 16.3. Do not include anything except the numbers.\n- when filling in the value property emphasize brevity and accuracy. however adapt its length in relation to the amount of relevant information.'     
                          
                    }
                ]  
            }],
            output_config: {     
                format: {
                    type: "json_schema",
                    schema: {
                            type: "object",
                            properties: {
                                "Term": fieldSchema,
                                "Rent": fieldSchema,
                                "Premises": fieldSchema,
                                "Security Deposit": fieldSchema,
                                "Maintenance and Repairs":fieldSchema,
                                "Utilities": fieldSchema,
                                "Insurance": fieldSchema,
                                "Taxes": fieldSchema,
                                "Surrender": fieldSchema,
                                "Holding Over": fieldSchema,
                                "Option to Extend Lease": fieldSchema,
                                "Notices": fieldSchema,
                                "Attorney Fees": fieldSchema,
                            },
                            required: [
                                "Term",
                                "Rent",
                                "Premises",
                                "Security Deposit",
                                "Maintenance and Repairs",
                                "Utilities",
                                "Insurance",
                                "Taxes",
                                "Surrender",
                                "Holding Over",
                                "Option to Extend Lease",
                                "Notices",
                                "Attorney Fees",
                            ],
                            additionalProperties: false,
                    },
                }
            }    
        });
        addLease(response, title);
    }