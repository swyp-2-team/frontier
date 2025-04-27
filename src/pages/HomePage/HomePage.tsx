import Sidebar from "@/shared/components/ui/Sidebar";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        {/* <Header /> */}
        {/* <Banner /> */}
        {/* <IncidentList /> */}
      </main>
    </div>
  );
}
