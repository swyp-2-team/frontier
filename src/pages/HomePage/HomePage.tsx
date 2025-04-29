import IncidentList from "@/features/incident/ui/IncidentList";
import Banner from "@/shared/components/ui/Banner";
import HowToUse from "@/shared/components/ui/HowToUse";

export default function HomePage() {
  return (
    <main className="flex-1 pt-[10px] px-[42px] overflow-y-auto">
      <section className="flex gap-8 w-full mb-8">
        <Banner />
        <HowToUse />
      </section>
      <section>
        <h1 className="title-20_SB text-gray-700 mb-[26px]">
          현재 발생중인 장애
        </h1>
        <IncidentList />
      </section>
    </main>
  );
}
