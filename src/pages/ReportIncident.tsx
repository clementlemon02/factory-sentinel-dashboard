
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import QRCodeDisplay from "@/components/QRCodeDisplay";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  severity: z.enum(["low", "medium", "high"], {
    required_error: "Please select a severity level.",
  }),
});

const ReportIncident = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      severity: undefined,
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, this would save the incident to your backend
    console.log(values);
    toast({
      title: "Incident Reported",
      description: "Your incident report has been submitted successfully.",
    });
    setSubmitted(true);
  };

  // For demo purposes we're using the current URL, but in a real app this would be a fixed URL
  const currentUrl = window.location.href;

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
        
        <h1 className="text-3xl font-bold mb-8">Report Safety Incident</h1>
        
        <Tabs defaultValue="form">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form">Report Form</TabsTrigger>
            <TabsTrigger value="qrcode">QR Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <Card className="max-w-2xl mx-auto p-6">
              {!submitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incident Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief title of the incident" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide a clear, concise title for the incident.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe what happened in detail" 
                              {...field} 
                              rows={4}
                            />
                          </FormControl>
                          <FormDescription>
                            Include relevant details such as what happened, who was involved, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Where did the incident occur?" {...field} />
                          </FormControl>
                          <FormDescription>
                            Be as specific as possible about the incident location.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="severity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Severity Level</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select severity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low - Minor issue, no injuries</SelectItem>
                              <SelectItem value="medium">Medium - Potential hazard, minor injuries</SelectItem>
                              <SelectItem value="high">High - Serious hazard, injuries occurred</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the appropriate severity level for this incident.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Submit Report</Button>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Report Submitted</h3>
                  <p className="text-gray-600 mb-6">Thank you for your report. Safety management will review it shortly.</p>
                  <div className="space-x-4">
                    <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another</Button>
                    <Button asChild>
                      <Link to="/">Return to Dashboard</Link>
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="qrcode">
            <QRCodeDisplay 
              value={currentUrl} 
              title="Scan to Report an Incident"
              description="Share this QR code in accessible locations around the factory to make incident reporting easier."
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ReportIncident;
