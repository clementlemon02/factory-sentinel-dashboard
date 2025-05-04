
import { calendarDays } from "@/data/mockData";
import DayCard from "./DayCard";

const CalendarGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {calendarDays.map((day) => (
        <DayCard 
          key={day.date}
          date={day.date}
          displayDate={day.displayDate}
          dayOfWeek={day.dayOfWeek}
          fullDisplayDate={day.fullDisplayDate}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
