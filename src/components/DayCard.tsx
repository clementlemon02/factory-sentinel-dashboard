
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { hasIncidents } from "@/data/mockData";

interface DayCardProps {
  date: string;
  displayDate: string;
  dayOfWeek: string;
  fullDisplayDate?: string;
  isToday?: boolean;
}

const DayCard: React.FC<DayCardProps> = ({ 
  date, 
  displayDate, 
  dayOfWeek, 
  fullDisplayDate,
  isToday = false
}) => {
  const hasIncidentsForDay = hasIncidents(date);
  
  return (
    <Link to={hasIncidentsForDay ? `/incidents/${date}` : "#"} 
          className={cn(
            "block rounded-full transition-all flex items-center justify-center",
            hasIncidentsForDay 
              ? "bg-red-600 hover:bg-red-700 cursor-pointer" 
              : "bg-green-500 hover:bg-green-600",
            isToday && "ring-4 ring-offset-2 ring-blue-500",
            !hasIncidentsForDay && "pointer-events-none" // Disable click if no incidents
          )}
          style={{ width: '50px', height: '50px' }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className={cn(
          "text-md font-semibold",
          hasIncidentsForDay ? "text-white" : "text-white"
        )}>
          {displayDate}
        </span>
      </div>
    </Link>
  );
};

export default DayCard;
