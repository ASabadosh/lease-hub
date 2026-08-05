import Link from "next/link";

export default function Navbar() {
    return (
    <div className="flex flex-col items-center w-50 h-[630px] p-5">
        <Link href="/upload-lease" className="flex p-5 h-10 items-center justify-center w-full border border-blue-600 bg-slate-50 px-4 text-sm font-medium text-blue-600 rounded-md cursor-pointer hover:bg-blue-50 "> 
          + Upload Lease
        </Link>
        <Link href="/" className="flex mt-5 pl-5 text-sm font-medium text-blue-600 align-items-left w-full cursor-pointer">
          All Leases
        </Link>
      </div>
    );
}