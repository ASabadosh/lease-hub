export default function Navbar() {
    return (
    <div className="flex flex-col items-center w-64 h-[800px] bg-slate-50 p-5 border-r border-gray-200">
        <button className="flex p-5 h-10 items-center justify-center w-full border border-blue-600 bg-slate-50 px-4 text-sm font-medium text-blue-600 rounded-md hover:bg-blue-50 "> 
          + Upload Lease
        </button>
        <button className="flex mt-5 pl-5 text-sm font-medium text-blue-600 align-items-left w-full">
          All Leases
        </button>
      </div>
    );
}