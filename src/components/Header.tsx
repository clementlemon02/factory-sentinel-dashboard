
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-bold">Factory Safety Tracker</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/report">
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </Link>
          </Button>
          <Button asChild>
            <Link to="/report">Report Incident</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
