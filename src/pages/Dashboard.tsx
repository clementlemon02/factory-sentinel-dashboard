
import Header from "@/components/Header";
import CalendarGrid from "@/components/CalendarGrid";
import SafetySummary from "@/components/SafetySummary";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Safety Dashboard</h1>
        
        <SafetySummary />
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">30-Day Safety Calendar</h2>
          <p className="text-gray-500 mb-4">
            Green indicates no incidents. Red indicates one or more incidents occurred.
            Click on days with incidents to view details.
          </p>
        </div>
        
        <CalendarGrid />
      </main>
    </div>
  );
};

export default Dashboard;
