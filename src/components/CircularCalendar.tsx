
import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths } from "date-fns";
import { hasIncidents } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DayCard from "./DayCard";

const CircularCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate days for the current month
  const generateDaysInMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    return eachDayOfInterval({ start, end }).map(day => ({
      date: format(day, 'yyyy-MM-dd'),
      displayDate: format(day, 'd'),
      fullDisplayDate: format(day, 'MMMM dd, yyyy'),
      dayOfWeek: format(day, 'EEE'),
      isToday: isToday(day)
    }));
  };
  
  const [daysInMonth, setDaysInMonth] = useState(generateDaysInMonth(currentMonth));
  
  // Update days when month changes
  useEffect(() => {
    setDaysInMonth(generateDaysInMonth(currentMonth));
  }, [currentMonth]);
  
  const goToPreviousMonth = () => setCurrentMonth(date => subMonths(date, 1));
  const goToNextMonth = () => setCurrentMonth(date => addMonths(date, 1));
  
  return (
    <div className="flex flex-col items-center">
      {/* Month navigation */}
      <div className="flex items-center justify-between w-full mb-8">
        <Button variant="outline" onClick={goToPreviousMonth}>
          <ChevronLeft className="mr-1" /> Previous
        </Button>
        <h2 className="text-2xl font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <Button variant="outline" onClick={goToNextMonth}>
          Next <ChevronRight className="ml-1" />
        </Button>
      </div>
      
      {/* Circular calendar */}
      <div className="relative w-[600px] h-[600px] mx-auto mb-8">
        {/* Red circular background */}
        <div className="absolute inset-0 rounded-full bg-red-600"></div>
        
        {/* Inner circle with text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[220px] h-[220px] rounded-full bg-white flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-black">ZERO</p>
            <p className="text-4xl font-bold text-red-600">HARM</p>
          </div>
        </div>

        {/* Safety texts */}
        <div className="absolute inset-0">
          <div className="absolute top-[180px] left-[110px] text-white font-bold transform -rotate-45">THINK SAFE</div>
          <div className="absolute top-[180px] right-[110px] text-white font-bold transform rotate-45">WORK SAFE</div>
          <div className="absolute bottom-[180px] right-[110px] text-white font-bold transform rotate-[135deg]">HOME SAFE</div>
        </div>
        
        {/* Position the days in a circle */}
        {daysInMonth.map((day, index) => {
          const totalDays = daysInMonth.length;
          const angle = (index * (360 / totalDays)) * (Math.PI / 180);
          const radius = 240; // Increased radius for the circle
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          
          return (
            <div
              key={day.date}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <DayCard 
                date={day.date}
                displayDate={day.displayDate}
                dayOfWeek={day.dayOfWeek}
                fullDisplayDate={day.fullDisplayDate}
                isToday={day.isToday}
              />
            </div>
          );
        })}
      </div>
      
      {/* KPI Indicator */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold mb-4">KPI: NO INJURIES</h2>
        <div className="flex justify-center gap-20 items-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500 mx-auto mb-2"></div>
            <p className="font-bold text-lg">ON TARGET</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-600 mx-auto mb-2"></div>
            <p className="font-bold text-lg">OFF TARGET</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularCalendar;
