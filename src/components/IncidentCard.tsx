
import { Incident } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const severityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };
  
  const statusColors = {
    pending: "bg-amber-100 text-amber-800",
    assigned: "bg-purple-100 text-purple-800",
    resolved: "bg-green-100 text-green-800"
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{incident.title}</CardTitle>
          <Badge className={cn(severityColors[incident.severity])}>
            {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
          </Badge>
        </div>
        <CardDescription>{incident.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{incident.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge className={cn(statusColors[incident.status])}>
          {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
        </Badge>
        {incident.assignedTo && (
          <span className="text-sm text-gray-600">Assigned to: {incident.assignedTo}</span>
        )}
      </CardFooter>
    </Card>
  );
};

export default IncidentCard;
