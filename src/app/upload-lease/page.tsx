import Anthropic from "@anthropic-ai/sdk";
import type { Lease } from "@/models/Lease";
import type { LeaseFieldObject } from "@/models/LeaseFieldObject";
import { addLease } from "@/database/addLease";

type Field = {
    value: String,
    clauses: String
}

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

export default function UploadLease() {
    async function handleSubmit(formData: FormData){

        const title = formData.get("lease-title") as string;
        const lease = formData.get("lease-pdf") as File;
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
                        text:'Use the information in the given lease pdf to fill out the given json structure.  For each property\n   "term",\n    "rent",\n    "premises",\n    "security_deposit",\n    "maintenance_and_repairs",\n    "utilities",\n    "insurance",\n    "taxes",\n    "surrender",\n    "holding_over:",\n    "option_to_extend_lease",\n    "notices",\n    "attorney_fees")\nfill out the value property with the corresponding information from the lease and the clauses property with the source clauses for the extracted information. If the property is not specified in the lease, fill it in with nullL.\n\nFormat:\n- fill in clauses property like this: 16.16.2 16.3. Do not include anything except the numbers.\n- when filling in the value property emphasize brevity and accuracy. however adapt its length in relation to the amount of relevant information.'     
                          
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
                                "Holding Over:",
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

    return (
        <main className="w-full">
        <div className="flex flex-col p-5 bg-white h-[600px] w-full gap-2 border-l border-b border-gray-200">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                Upload Lease
            </h1>
            <p className="mb-3 text-sm text-gray-500">
                Upload a lease PDF and Lease Parser will automatically extract key information for review.
            </p>
            <div className="border-b border-gray-200 w-full">

            </div>
            <form action={handleSubmit}>
            <div className="flex mt-5 gap-10">
                <div className="flex flex-col gap-5 w-[700px]">
                    <label htmlFor="lease-title" className="tracking-tight text-sm font-semibold text-gray-900">
                        Lease Title
                    </label>
                     <input
                        name="lease-title"
                        id="lease-title"
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="e.g. Downtown Office Lease"
                    />
                    <p className="tracking-tight text-sm font-semibold text-gray-900">
                         Lease PDF
                    </p>
                    <label htmlFor="lease-pdf" className="w-full rounded-md border border-gray-300 h-[200px] flex items-center justify-center text-sm text-gray-400 bg-blue-50 text-center">
                        <div>
                        Drag and drop your PDF here
                        <br/> 
                        or
                        <span className="text-blue-600"> browse files</span>
                        </div>
                    </label>
                    <input
                        name="lease-pdf"
                        id="lease-pdf"
                        type="file"
                        className="hidden"
                    />
                </div>
                <div className="rounded-lg border border-gray-200 bg-slate-50 p-5">
                    <h3 className="mb-4 text-sm font-semibold text-gray-900">
                        How it works
                    </h3>
                    <ol className="space-y-2 text-sm text-gray-600">
                        <li>1. Upload your lease PDF</li>
                        <li>2. We analyze the document and extract key information</li>
                        <li>3. Review and confirm the information</li>
                        <li>4. Edit or add any additional information</li>
                    </ol>
                </div>
            </div>
            <div className="flex justify-end pr-5 mt-5">
                <button type="submit" className="w-[200px] rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                    Upload & Analyze
                </button>
            </div>
            </form>
        </div>
        </main>
    );
}