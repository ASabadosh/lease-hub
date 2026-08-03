"use client";
import LeasePreview from "@/components/leasePreview";
import LeaseTable from "@/components/leaseTable";
import { Lease } from "@/models/Lease";
import { AdditionalLeaseField } from "@/models/AdditionalLeaseField";
import { useState } from "react";

type LeaseDisplayProps = {
  leases: Lease[];
  additional_lease_fields: AdditionalLeaseField[];
};

export default function LeaseDisplay({
  leases,
  additional_lease_fields,
}: LeaseDisplayProps) {
  const [selected_lease, setLease] = useState<Lease | null>(null);
  const [additional_lease_fields_state, setAdditionalLeaseFieldsState] =
    useState<AdditionalLeaseField[]>(additional_lease_fields);

  function handleClick(lease: Lease) {
    setLease(lease);
  }

  return (
    <div className="flex">
      <div className="flex flex-col w-70 h-[600px] p-5 border-r border-b border-l border-gray-200 bg-white">
        <h2 className="text-xl font-semibold text-gray-900">All Leases</h2>
        <div className="flex flex-col mt-4 gap-1">
          {leases.map((lease: Lease) => (
            <button
              onClick={() => handleClick(lease)}
              key={lease.id}
              className="flex cursor-pointer rounded-sm border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
            >
              <LeasePreview id={lease.id} title={lease.title} />
            </button>
          ))}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        {selected_lease ? (
          <LeaseTable
            lease={selected_lease}
            additional_lease_fields={additional_lease_fields_state.filter(
              (field) => field.lease_id === selected_lease.id,
            )}
            onFieldAdded={(newField) =>
              setAdditionalLeaseFieldsState([
                ...additional_lease_fields_state,
                newField,
              ])
            }
          />
        ) : (
          <h3> Select a lease to view and edit details</h3>
        )}
      </div>
    </div>
  );
}
