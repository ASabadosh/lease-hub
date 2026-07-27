import LeaseDisplay from "@/components/leaseDisplay";
import { getLeases } from "@/database/getLeases";
import { Lease } from "@/models/Lease";

export default async function Home() {

  const leases = await getLeases();

  if (leases === null) {
    return (
      <div className = "flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-900">
          Database connection failed
        </h2>
      </div>
    )
  } else if (leases.length === 0) {
    return (
    <div className = "flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-900">
          No Leases Found
        </h2>
      </div>
    )
  } else return(
  <LeaseDisplay leases={leases} />
  )
}