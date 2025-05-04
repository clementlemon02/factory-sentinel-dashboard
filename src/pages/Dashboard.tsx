
import Header from "@/components/Header";
import SafetySummary from "@/components/SafetySummary";
import CircularCalendar from "@/components/CircularCalendar";
import QRCodeDisplay from "@/components/QRCodeDisplay";

const Dashboard = () => {
  // Use current URL for the QR code value
  const qrCodeValue = window.location.origin + "/report";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left section with calendar - 3 columns */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-red-600">Safety</span>
                <span> - Month:</span>
              </h1>
              <hr className="border-t-2 border-gray-300 mb-6" />
            </div>
            
            <CircularCalendar />
          </div>
          
          {/* Right section with indicators and QR code - 2 columns */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500 mr-4"></div>
                <hr className="flex-1 border-t-2 border-gray-300" />
              </div>
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 rounded-full bg-red-500 mr-4"></div>
                <hr className="flex-1 border-t-2 border-gray-300" />
              </div>
              
              <SafetySummary />
              
              {/* Always visible QR code */}
              <div className="mt-8">
                <QRCodeDisplay 
                  value={qrCodeValue}
                  size={150}
                  title="Report Safety Incident"
                  description="Scan this QR code to report a safety incident"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
