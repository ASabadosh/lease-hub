import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex h-20"> 
        <h1>
          LeaseHub
        </h1>
      </div>
      <div className="flex">
      <div className="flex flex-col items-center w-64">
        <button className="p-5 h-10 items-center border-blue-600 bg-white px-4 text-sm font-medium text-blue-600"> 
          + Upload lease
        </button>
        <button className="flex pt-5 text-sm font-medium text-blue-600">
          All Leases
        </button>
      </div>

      </div>
    </main>
  );
}
