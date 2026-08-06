export default function UploadLease() {
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
            <div className="flex mt-5 gap-10">
                <form className="flex flex-col gap-5 w-[700px]">
                    <label htmlFor="lease-title" className="tracking-tight text-sm font-semibold text-gray-900">
                        Lease Title
                    </label>
                     <input
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
                        id="lease-pdf"
                        type="file"
                        className="hidden"
                    />
                </form>
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
        </div>
        </main>
    );
}