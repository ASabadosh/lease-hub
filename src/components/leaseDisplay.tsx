"use client";
import { getLeases } from "@/database/getLeases";
import LeasePreview from "@/components/leasePreview";
import LeaseTable from "@/components/leaseTable";
import { Lease } from "@/models/Lease";
import { useState } from "react";

type LeaseDisplayProps = {
  leases: Lease[];
};

export default function LeaseDisplay({leases} : LeaseDisplayProps) {

  const [selected_lease, setLease] = useState<Lease | null>(null);

  async function handleClick(lease: Lease) {
    setLease(lease);
  }

  return (
    <main>
      <div className="flex">
      <div className="flex flex-col w-70 h-[600px] p-5 border-r border-b border-l border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
            All Leases
        </h2>
        <div className="flex flex-col mt-4 gap-1">
        {leases.map((lease: Lease) => (
          <button onClick={() => handleClick(lease)} key={lease.id} className="flex cursor-pointer rounded-sm border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
            <LeasePreview
            id={lease.id}
            title={lease.title}
            />
          </button>
        ))}
        </div>
        </div>
     { selected_lease ? <LeaseTable
      id={selected_lease.id}
      title={selected_lease.title}
      /> : <h3> Select a lease to view and edit details</h3> }
     </div>
    </main>
  );
}
