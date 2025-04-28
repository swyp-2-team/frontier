import Banner from "@/shared/components/ui/Banner";
import HowToUse from "@/shared/components/ui/HowToUse";

export default function HomePage() {
  return (
    <main className="flex-1 pt-[10px] px-[42px] overflow-y-auto">
      <div className="flex gap-8 w-full">
        <Banner />
        <HowToUse />
      </div>
      {/* <IncidentList /> */}
    </main>
  );
}
