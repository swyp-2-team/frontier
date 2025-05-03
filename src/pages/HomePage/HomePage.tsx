import IncidentList from "@/features/incident/ui/IncidentList";
import Banner from "@/shared/components/ui/Banner";
import HowToUse from "@/shared/components/ui/HowToUse";

export default function HomePage() {
  return (
    <main className="flex-1 px-[42px] overflow-y-auto border-l border-gray-400">
      <section className="flex gap-6 2xl:gap-8 w-full mb-5 2xl:mb-8">
        <Banner />
        <HowToUse />
      </section>
      <section>
        <h1 className="body-18_SB 2xl:title-20_SB text-gray-700 mb-5 2xl:mb-8">
          현재 발생중인 장애
        </h1>
        <IncidentList showActive={true} />
      </section>
    </main>
  );
}
