
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import IncidentCard from "@/components/IncidentCard";
import { getIncidentsByDate, personnel } from "@/data/mockData";

const IncidentDetails = () => {
  const { date = "" } = useParams<{ date: string }>();
  const [incidents, setIncidents] = useState(getIncidentsByDate(date));
  const { toast } = useToast();
  
  const dateObj = date ? new Date(date) : new Date();
  const formattedDate = format(dateObj, "MMMM dd, yyyy");
  
  const handleAssignPerson = (incidentId: string, personId: string) => {
    const person = personnel.find(p => p.id === personId);
    
    setIncidents(prevIncidents => 
      prevIncidents.map(incident => 
        incident.id === incidentId 
          ? { 
              ...incident, 
              status: "assigned" as const, 
              assignedTo: person ? person.name : undefined 
            } 
          : incident
      )
    );
    
    toast({
      title: "Personnel Assigned",
      description: `Incident has been assigned to ${person?.name}.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Incidents on {formattedDate}</h1>
          <p className="text-gray-500 mt-2">
            {incidents.length} incident{incidents.length !== 1 ? "s" : ""} reported
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {incidents.map(incident => (
            <div key={incident.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <IncidentCard incident={incident} />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assign Personnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Current Status</p>
                        <div className={`text-sm px-3 py-1.5 rounded-md inline-block ${
                          incident.status === "pending" ? "bg-amber-100 text-amber-800" :
                          incident.status === "assigned" ? "bg-purple-100 text-purple-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {incident.status === "pending" ? "Pending" :
                           incident.status === "assigned" ? `Assigned to ${incident.assignedTo}` :
                           "Resolved"}
                        </div>
                      </div>
                      
                      {incident.status !== "resolved" && (
                        <div>
                          <p className="text-sm font-medium mb-2">Assign to</p>
                          <Select 
                            onValueChange={(value) => handleAssignPerson(incident.id, value)}
                            defaultValue={personnel.find(p => p.name === incident.assignedTo)?.id}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select personnel" />
                            </SelectTrigger>
                            <SelectContent>
                              {personnel.map(person => (
                                <SelectItem key={person.id} value={person.id}>
                                  {person.name} ({person.role})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      {incident.status === "assigned" && (
                        <Button 
                          onClick={() => {
                            setIncidents(prevIncidents => 
                              prevIncidents.map(inc => 
                                inc.id === incident.id 
                                  ? { ...inc, status: "resolved" as const } 
                                  : inc
                              )
                            );
                            toast({
                              title: "Incident Resolved",
                              description: `Incident "${incident.title}" has been marked as resolved.`,
                            });
                          }}
                          className="w-full"
                        >
                          Mark as Resolved
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default IncidentDetails;
