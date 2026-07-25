import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

async function getLeases() {
    await supabase.from("leases").select("*");
}

export default function Home() {

  const leases = getLeases();
  return (
    <main>
      <div className="flex">
      <div className="flex flex-col w-80 p-5">
        <h2 className="text-xl font-semibold text-gray-900">
            All Leases
        </h2>
      </div>
      </div>
    </main>
  );
}
