
import React from "react";
import { Link } from "react-router-dom";
import { calendarDays } from "@/data/mockData";
import { hasIncidents } from "@/data/mockData";
import { cn } from "@/lib/utils";

const CircularCalendar = () => {
  const totalDays = calendarDays.length;
  const radius = 160; // Radius of the circle
  
  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      {/* Red circular background */}
      <div className="absolute inset-0 rounded-full bg-red-600"></div>
      
      {/* Inner circle with text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[160px] h-[160px] rounded-full bg-white flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-black">ZERO</p>
          <p className="text-3xl font-bold text-red-600">HARM</p>
        </div>
      </div>

      {/* Safety texts */}
      <div className="absolute inset-0">
        <div className="absolute top-[120px] left-[60px] text-white font-semibold transform -rotate-45">THINK SAFE</div>
        <div className="absolute top-[120px] right-[60px] text-white font-semibold transform rotate-45">WORK SAFE</div>
        <div className="absolute bottom-[120px] right-[60px] text-white font-semibold transform rotate-[135deg]">HOME SAFE</div>
      </div>
      
      {/* Position the days in a circle */}
      {calendarDays.map((day, index) => {
        const angle = (index * (360 / totalDays)) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        const hasIncidentsForDay = hasIncidents(day.date);
        
        return (
          <Link
            key={day.date}
            to={hasIncidentsForDay ? `/incidents/${day.date}` : "#"}
            className={cn(
              "absolute w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center",
              "transform -translate-x-1/2 -translate-y-1/2",
              hasIncidentsForDay ? "border-2 border-red-600" : "",
              !hasIncidentsForDay && "pointer-events-none"
            )}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <span className="text-sm font-semibold">{day.displayDate}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default CircularCalendar;
