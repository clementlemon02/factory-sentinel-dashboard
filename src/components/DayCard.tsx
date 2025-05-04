
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { hasIncidents } from "@/data/mockData";
import { isAfter, startOfDay } from "date-fns";

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
  const today = startOfDay(new Date());
  const currentDate = startOfDay(new Date(date));
  const isFutureDate = isAfter(currentDate, today);
  
  // Determine background color based on date and incidents
  let bgColor = "bg-white"; // Default for future dates
  
  if (!isFutureDate) {
    // Past or current dates
    bgColor = hasIncidentsForDay ? "bg-red-600" : "bg-green-500";
  }
  
  return (
    <Link to={hasIncidentsForDay ? `/incidents/${date}` : "#"} 
          className={cn(
            "flex items-center justify-center rounded-full border-2 border-black transition-all",
            bgColor,
            isToday && "ring-4 ring-offset-2 ring-blue-500",
            !hasIncidentsForDay && "pointer-events-none" // Disable click if no incidents
          )}
          style={{ width: '55px', height: '55px' }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className={cn(
          "text-md font-bold",
          isFutureDate || !hasIncidentsForDay ? "text-black" : "text-white"
        )}>
          {displayDate}
        </span>
      </div>
    </Link>
  );
};

export default DayCard;
