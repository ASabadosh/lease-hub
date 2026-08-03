import LeaseDisplay from "@/components/leaseDisplay";
import { getLeases } from "@/database/getLeases";
import { getAdditionalLeaseFields } from "@/database/getAdditionalLeaseFields";

export default async function Home() {

  const leases = await getLeases();
  const additional_lease_fields = await getAdditionalLeaseFields();

  if (leases === null || additional_lease_fields === null) {
    return (
      <main>
      <div className = "flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-900">
          Database connection failed
        </h2>
      </div>
      </main>
    )
  } else if (leases.length === 0) {
    return (
      <main>
      <div className = "flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-900">
          No Leases Found
        </h2>
      </div>
      </main>
    )
  } else return(
  <main className="w-full">
    <LeaseDisplay leases={leases} additional_lease_fields={additional_lease_fields} />
  </main>
  )
}