
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, AlertCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">Factory Safety Tracker</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm" className="text-red-600 bg-white hover:bg-gray-100 border-none shadow-sm">
            <Link to="/report">
              <AlertCircle className="mr-2 h-4 w-4" />
              Report Incident
            </Link>
          </Button>
          <Button asChild className="bg-white text-red-600 hover:bg-gray-100 shadow-sm">
            <Link to="/">
              <Calendar className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
