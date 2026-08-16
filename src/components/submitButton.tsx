"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  if(pending) {
    return (
        <div className="flex justify-between items-start mt-5 p-5">
        <div className="rounded-md border border-gray-300 bg-blue-50 w-[600px] p-5">
            <p className="text-base font-semibold text-gray-900">
                Analyzing lease with Claude...
            </p>
        </div>
      <button
        type="submit"
        className="h-[40px] w-[200px] rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        disabled={true}
      >
        Analyzing...
        </button>
        </div>
    );
  } else {
  return (
    <div className="flex justify-end pr-5 mt-5">
      <button
        type="submit"
        className="h-[40px] w-[200px] rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        Upload & Analyze
      </button>
    </div>
  );
}
}