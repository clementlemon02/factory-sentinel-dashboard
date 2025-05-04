
import { mockIncidents } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SafetySummary = () => {
  const totalDays = 30;
  const daysWithIncidents = new Set(mockIncidents.map(incident => incident.date)).size;
  const safeDays = totalDays - daysWithIncidents;
  const safetyPercentage = Math.round((safeDays / totalDays) * 100);
  
  const pendingIncidents = mockIncidents.filter(incident => incident.status === "pending").length;
  const assignedIncidents = mockIncidents.filter(incident => incident.status === "assigned").length;
  const resolvedIncidents = mockIncidents.filter(incident => incident.status === "resolved").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Safety Score</CardDescription>
          <CardTitle className="text-2xl">{safetyPercentage}%</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{safeDays} of {totalDays} days incident-free</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Incidents</CardDescription>
          <CardTitle className="text-2xl">{mockIncidents.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Across {daysWithIncidents} days</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Pending Resolution</CardDescription>
          <CardTitle className="text-2xl">{pendingIncidents}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <span className="text-sm px-2 py-1 bg-amber-100 text-amber-800 rounded-full">{assignedIncidents} Assigned</span>
          <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">{resolvedIncidents} Resolved</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Last Incident</CardDescription>
          <CardTitle className="text-2xl">
            {mockIncidents.length > 0 ? mockIncidents[0].title.substring(0, 20) : "None"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {mockIncidents.length > 0 ? mockIncidents[0].date : "N/A"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetySummary;
