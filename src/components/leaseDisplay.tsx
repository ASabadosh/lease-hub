"use client";
import LeasePreview from "@/components/leasePreview";
import LeaseTable from "@/components/leaseTable";
import { Lease } from "@/models/Lease";
import { AdditionalLeaseField } from "@/models/AdditionalLeaseField";
import { useState } from "react";
import { TableRow } from "@/models/TableRow";

type LeaseDisplayProps = {
  leases: Lease[];
  additional_lease_fields: AdditionalLeaseField[]; //list from database
};

export default function LeaseDisplay({
  leases,
  additional_lease_fields,
}: LeaseDisplayProps) {
  const [updatedLeases, setUpdatedLeases] = useState<Lease[]>(leases);
  const [selectedLease, setLease] = useState<Lease | null>(null);
  //current list of fields: from database w/ user additions
  const [updatedAdditionalLeaseFields, setUpdatedAdditionalLeaseFields] = useState<AdditionalLeaseField[]>(additional_lease_fields);

  function handleClick(lease: Lease) {
    setLease(lease);
  }

  // Update the "confirmed" value in either leases or additioanal fields
  function onTableUpdated(cell: any, property: keyof TableRow) {
    const row = cell.getRow().getData();
    const newValue = cell.getValue();
    if (row.sourceTable === "leases") {
        let updatedUpdatedLeases: any = updatedLeases;
        for (const lease of updatedUpdatedLeases) {
            //if (selectedLease) needed for typscript
            if (selectedLease) {
                if (lease.id === selectedLease.id) {
                    lease[row.field][property] = newValue;
                    break;
                }
            }
        }   
        setUpdatedLeases(updatedUpdatedLeases);
    }
    if (row.sourceTable === "additional_lease_fields") {
        let updatedFields: any = updatedAdditionalLeaseFields;
        for (const field of updatedFields) {
            if (field.id === row.id) {
                field[property] = newValue;
                break;
            }
        }
        setUpdatedAdditionalLeaseFields(updatedFields);
    }
  }

  return (
    <div className="flex bg-white border-l border-b border-gray-200">
      <div className="flex flex-col w-70 h-[600px] p-5 border-r border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">All Leases</h2>
        <div className="flex flex-col mt-4 gap-1 overflow-y-auto">
          {updatedLeases.map((lease: Lease) => (
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
        {selectedLease ? (
          <div className="min-w-0 flex-1">
          <LeaseTable
            lease={selectedLease}
            additional_lease_fields={updatedAdditionalLeaseFields.filter(
              (field) => field.lease_id === selectedLease.id,
            )}
            onFieldAdded={(newField) =>
              setUpdatedAdditionalLeaseFields([
                ...updatedAdditionalLeaseFields,
                newField,
              ])
            }
            onTableUpdated={onTableUpdated}
          />
          </div>
        ) : (
        <div className="flex items-center justify-center w-full">
          <h3 className="text-gray-400"> Select a lease to view and edit details</h3>
        </div>
        )}
    </div>
  );
}
