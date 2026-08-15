"use client"
import queryClaude from "@/app/actions/queryClaude";
import { useFormStatus } from "react-dom";
import SubmitButton from "@/components/submitButton";

export default function UploadLease() {
    const { pending } = useFormStatus();

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file){
            return;
        }
        if (file.type !== "application/pdf") {
            alert("File must be a PDF");
            event.target.value = "";
            return;
        }
        if (file && file.size > 20 * 1024 * 1024) {
            alert("File must be under 20MB");
            event.target.value = "";
        }
    }

    function handleSubmit(formData: FormData) {
        const file = formData.get("lease-pdf");

        if (!(file instanceof File) || file.size == 0) {
            alert("Must upload file");
            return;
        }
        queryClaude(formData);
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
            <form 
            action={handleSubmit}
            >
            <div className="flex mt-5 gap-10">
                <div className="flex flex-col gap-5 w-[700px]">
                    <label htmlFor="lease-title" className="tracking-tight text-sm font-semibold text-gray-900">
                        Lease Title
                    </label>
                     <input
                        name="lease-title"
                        id="lease-title"
                        type="text"
                        required
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="e.g. Downtown Office Lease"
                    />
                    <p className="tracking-tight text-sm font-semibold text-gray-900">
                         Lease PDF
                    </p>
                    <label htmlFor="lease-pdf" className="w-full rounded-md border border-gray-200 h-[200px] flex items-center justify-center text-sm bg-blue-50 text-center cursor-pointer text-blue-600">
                       Browse files
                    </label>
                    <input
                        name="lease-pdf"
                        id="lease-pdf"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="rounded-md border border-gray-200 bg-slate-50 p-5">
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
            <SubmitButton/>
            </form>
        </div>
        </main>
    );
}