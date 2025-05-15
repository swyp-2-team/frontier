import { useRefetchIncidents } from "@/features/incident/model/useRefetchIncident";
import IncidentList from "@/features/incident/ui/IncidentList";
import Banner from "@/shared/components/ui/Banner";
import { Button } from "@/shared/components/ui/button";
import HowToUse from "@/shared/components/ui/HowToUse";
import RefreshIcon from "@/assets/icons/refresh.svg?react";

export default function HomePage() {
  const handleRefetch = useRefetchIncidents();

  return (
    <main className="flex-1 px-[42px] overflow-y-auto">
      <section className="flex gap-6 2xl:gap-8 w-full mb-5 2xl:mb-8">
        <Banner />
        <HowToUse />
      </section>
      <section>
        <div className="flex items-center justify-between gap-4 mb-3 2xl:mb-5">
          <h1 className="body-18_SB 2xl:title-20_SB text-gray-700">
            현재 발생중인 장애
          </h1>
          <RefreshIcon
            className="size-10 cursor-pointer"
            onClick={handleRefetch}
          />
        </div>

        <IncidentList showActive={true} />
      </section>
    </main>
  );
}
