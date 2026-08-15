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

export default async function queryClaude(formData: FormData) {

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
            model: "claude-opus-5", 
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
                        text:"Use the information in the given lease pdf to fill out the given JSON structure.\n\n For each property of the given JSON:\n - fill out the value property with the corresponding information from the lease PDF (see Corresponding-Information) and the clauses property with the source clauses for the extracted information. Emphasize accuracy then brevity, however, extend your answer length if there is a large amount of corresponding information.\n - If the JSON property is not defined in the lease, fill it in with null. Do not fill it in with a fieldSchema object.\n Format:\n- fill in clauses property like this: 16.16.2 16.3. Do not include anything except the numbers.\n Corresponding-Information: Term: Information describing the duration and timing of the lease, including commencement, expiration, effective dates, lease periods, and other provisions that determine when the lease begins, ends, or remains in effect.\n Rent: Information describing rent and recurring occupancy payments, including amounts, payment schedules, due dates, increases, adjustments, escalations, and other rent-related obligations,\n Premises: Information identifying and describing the property or space being leased, including location, address, unit or suite, size, included areas, parking, storage, common areas, and other relevant characteristics of the leased premises.\n Security Deposit: Information concerning security provided by the tenant, including the amount, payment requirements, permitted uses, replenishment, deductions, return conditions, letters of credit, or other forms of security,\n Maintenance and Repairs: Information describing responsibility for maintaining, repairing, replacing, cleaning, or otherwise caring for the premises, building, systems, equipment, structural components, and related property.\n Utilities: Information concerning utilities and services provided to or used by the premises, including responsibility for payment, allocation, metering, electricity, water, gas, HVAC, telecommunications, waste services, and similar services.\n Insurance: Information concerning insurance requirements, coverage responsibilities, required policies, limits, certificates, additional insured requirements, waivers, liability coverage, property coverage, and other insurance-related obligations.\n Taxes: Information concerning taxes, assessments, governmental charges, and similar expenses, including responsibility for payment, reimbursement, increases, allocation, real estate taxes, personal property taxes, and special assessments.\n Surrender: Information describing the tenants obligations when returning or vacating the premises, including required condition, removal of property, restoration, cleaning, repairs, alterations, keys, damage, and other end-of-lease requirements.\n Holding Over: Information describing what happens if the tenant remains in possession after the lease expires or terminates, including rent, penalties, tenancy status, damages, landlord rights, and other holdover consequences.\n Option to Extend Lease: Information concerning any right or option to renew, extend, or continue the lease, including extension periods, exercise procedures, notice deadlines, conditions, rent adjustments, and limitations.\n Notices: Information describing how formal notices under the lease must be provided, including delivery methods, addresses, recipients, timing, deemed-received rules, electronic delivery, and procedures for changing notice information.\n Attorney Fees: Information concerning responsibility for attorney fees, legal expenses, court costs, collection costs, enforcement expenses, prevailing-party rights, and other legal costs arising from the lease.\n"
                    }
                ]  
            }],
            output_config: {     
                format: {
                    type: "json_schema",
                    schema: {
                            type: "object",
                            properties: {
                                "Attorney Fees": fieldSchema,
                                "Notices": fieldSchema,
                                "Option to Extend Lease": fieldSchema,
                                "Holding Over": fieldSchema,
                                "Surrender": fieldSchema,
                                "Taxes": fieldSchema,
                                "Insurance": fieldSchema,
                                "Utilities": fieldSchema,
                                "Maintenance and Repairs": fieldSchema,
                                "Security Deposit": fieldSchema,
                                "Premises": fieldSchema,
                                "Rent": fieldSchema,
                                "Term": fieldSchema,
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
        console.log("stop reason:", response.stop_reason);
        console.log("usage:", response.usage);
        console.log("content:", response.content);
        addLease(response, title);
    }