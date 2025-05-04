
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
            "block rounded-lg border p-4 transition-all",
            hasIncidentsForDay 
              ? "bg-incident/10 border-incident hover:bg-incident/20 cursor-pointer" 
              : "bg-safe/10 border-safe hover:bg-safe/20",
            !hasIncidentsForDay && "pointer-events-none" // Disable click if no incidents
          )}
    >
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-500">{dayOfWeek}</span>
        <span className="text-lg font-semibold">{displayDate}</span>
        <div 
          className={cn(
            "mt-2 w-3 h-3 rounded-full",
            hasIncidentsForDay ? "bg-incident" : "bg-safe"
          )} 
        />
      </div>
    </Link>
  );
};

export default DayCard;
