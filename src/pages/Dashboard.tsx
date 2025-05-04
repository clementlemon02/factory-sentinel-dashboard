
import Header from "@/components/Header";
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
              <h1 className="text-3xl font-bold mb-4">
                Safety Tracker
              </h1>
              <hr className="border-t-2 border-gray-300 mb-6" />
            </div>
            
            <CircularCalendar />
          </div>
          
          {/* Right section with QR code - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Department</h2>
                <div className="flex items-center">
                  <span className="text-md">Final Assembly</span>
                  <span className="ml-2">▼</span>
                </div>
              </div>
              
              {/* Always visible QR code */}
              <div className="mt-8">
                <QRCodeDisplay 
                  value={qrCodeValue}
                  size={180}
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
