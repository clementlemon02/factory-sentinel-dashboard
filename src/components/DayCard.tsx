
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
            "block rounded-full border-2 p-2 transition-all flex items-center justify-center",
            hasIncidentsForDay 
              ? "bg-white border-red-600 hover:bg-red-50 cursor-pointer" 
              : "bg-white border-green-500 hover:bg-green-50",
            isToday && "ring-2 ring-offset-2 ring-blue-500",
            !hasIncidentsForDay && "pointer-events-none" // Disable click if no incidents
          )}
          style={{ width: '36px', height: '36px' }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs text-gray-700 font-medium">{displayDate}</span>
        <div 
          className={cn(
            "mt-0.5 w-1.5 h-1.5 rounded-full",
            hasIncidentsForDay ? "bg-red-600" : "bg-green-500"
          )} 
        />
      </div>
    </Link>
  );
};

export default DayCard;
