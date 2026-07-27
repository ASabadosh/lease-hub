import { createClient } from "@/utils/supabase/client";
import LeasePreview from "@/components/leasePreview";
import { Lease } from "@/models/Lease";

const supabase = createClient();

async function getLeases() {
  const {data, error} = await supabase.from("leases").select("*");

  if (error) {
    console.error("Error fetching leases:", error);
  }

  return data;
}

export default async function Home() {

  const leases = await getLeases();

  if (leases === null) {
    return (
      <div className = "flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-900">
          No Leases Found
        </h2>
      </div>
    )
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
          <LeasePreview
          key={lease.id}
          id={lease.id}
          title={lease.title}
          />
        ))}
        </div>
      </div>
      </div>
    </main>
  );
}
