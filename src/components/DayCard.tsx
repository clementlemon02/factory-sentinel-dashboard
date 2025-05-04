
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { hasIncidents } from "@/data/mockData";

interface DayCardProps {
  date: string;
  displayDate: string;
  dayOfWeek: string;
  fullDisplayDate?: string;
}

const DayCard: React.FC<DayCardProps> = ({ date, displayDate, dayOfWeek, fullDisplayDate }) => {
  const hasIncidentsForDay = hasIncidents(date);
  
  return (
    <Link to={hasIncidentsForDay ? `/incidents/${date}` : "#"} 
          className={cn(
            "block rounded-full border-2 p-3 transition-all flex items-center justify-center",
            hasIncidentsForDay 
              ? "bg-white border-red-600 hover:bg-red-50 cursor-pointer" 
              : "bg-white border-green-500 hover:bg-green-50",
            !hasIncidentsForDay && "pointer-events-none" // Disable click if no incidents
          )}
    >
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-500">{dayOfWeek}</span>
        <span className="text-lg font-semibold">{displayDate}</span>
        <div 
          className={cn(
            "mt-1 w-2 h-2 rounded-full",
            hasIncidentsForDay ? "bg-red-600" : "bg-green-500"
          )} 
        />
      </div>
    </Link>
  );
};

export default DayCard;
