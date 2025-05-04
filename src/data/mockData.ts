
import { format } from "date-fns";

export interface Incident {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  severity: "low" | "medium" | "high";
  status: "pending" | "assigned" | "resolved";
  assignedTo?: string;
}

// Get today's date and format it
const today = new Date();
const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

// Create sample data for the past 30 days
const generateMockIncidents = () => {
  // Incidents for a few specific days
  const incidents: Incident[] = [
    {
      id: "inc-001",
      date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
      title: "Minor Slip and Fall",
      description: "Employee slipped on wet floor in corridor B. No serious injury.",
      location: "Production Floor - Corridor B",
      severity: "low",
      status: "resolved",
      assignedTo: "Sarah Johnson",
    },
    {
      id: "inc-002",
      date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
      title: "Equipment Malfunction",
      description: "Conveyor belt stopped unexpectedly. Maintenance required.",
      location: "Assembly Line 3",
      severity: "medium",
      status: "assigned",
      assignedTo: "Mike Reynolds",
    },
    {
      id: "inc-003",
      date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)),
      title: "Chemical Spill",
      description: "Small amount of solvent spilled during transfer. Contained and cleaned according to protocol.",
      location: "Chemical Storage - Room 105",
      severity: "medium",
      status: "resolved",
      assignedTo: "Emma Chen",
    },
    {
      id: "inc-004",
      date: formatDate(today),
      title: "Electrical Issue",
      description: "Exposed wiring found near workstation 12. Area has been cordoned off.",
      location: "Manufacturing Section D",
      severity: "high",
      status: "pending",
      assignedTo: undefined,
    },
  ];
  
  return incidents;
};

// Generate dates for the past 30 days
export const generateCalendarDays = (days: number = 30) => {
  const result = [];
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    result.push({
      date: formatDate(currentDate),
      displayDate: format(currentDate, "MMM dd"),
      fullDisplayDate: format(currentDate, "MMMM dd, yyyy"),
      dayOfWeek: format(currentDate, "EEE"),
    });
  }
  return result;
};

export const mockIncidents = generateMockIncidents();
export const calendarDays = generateCalendarDays();

// Function to check if a day has incidents
export const hasIncidents = (date: string) => {
  return mockIncidents.some(incident => incident.date === date);
};

// Function to get incidents for a specific date
export const getIncidentsByDate = (date: string) => {
  return mockIncidents.filter(incident => incident.date === date);
};

// Sample personnel who can be assigned to incidents
export const personnel = [
  { id: "p1", name: "Sarah Johnson", role: "Safety Officer" },
  { id: "p2", name: "Mike Reynolds", role: "Maintenance Lead" },
  { id: "p3", name: "Emma Chen", role: "Operations Manager" },
  { id: "p4", name: "David Garcia", role: "Facilities Technician" },
  { id: "p5", name: "Aisha Patel", role: "EHS Specialist" },
];
