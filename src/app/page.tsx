import LeaseDisplay from "@/components/leaseDisplay";
import { getLeases } from "@/database/getLeases";
import { getAdditionalLeaseFields } from "@/database/getAdditionalLeaseFields";

export default async function Home() {

  const leases = await getLeases();
  const additional_lease_fields = await getAdditionalLeaseFields();

  if (leases === null || additional_lease_fields === null) {
    return (
      <main className="w-full">
      <div className = "flex items-center justify-center bg-white h-[600px] border-l border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Database connection failed
        </h2>
      </div>
      </main>
    )
  } else if (leases.length === 0) {
    return (
      <main className="w-full">
      <div className = "flex items-center justify-center bg-white h-[600px] border-l border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          No leases yet
        </h2>
        <p>
          Upload your first lease PDF to automatically extract key information
        </p>
      </div>
      </main>
    )
  } else return(
  <main className="w-full">
    <LeaseDisplay leases={leases} additional_lease_fields={additional_lease_fields} />
  </main>
  )
}