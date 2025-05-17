
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComplaints } from "../context/ComplaintsContext";
import { generateComplaintId, getDepartmentForCategory, getExpectedResolutionDate, formatDate, copyToClipboard } from "../utils/helpers";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "../utils/helpers";

const SubmitComplaint = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { complaints, addComplaint } = useComplaints();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];
    const id = generateComplaintId();
    
    const newComplaint = {
      id,
      ...formData,
      status: 'New',
      submittedDate: currentDate,
      lastUpdated: currentDate,
      contact: formData.email,
      department: getDepartmentForCategory(formData.category),
      priority: 'Medium',
      progress: 10,
      expectedResolution: getExpectedResolutionDate(currentDate),
      timeline: [
        {
          date: new Date().toLocaleString(),
          status: 'Submitted',
          details: 'Complaint registered successfully'
        }
      ]
    };
    
    addComplaint(newComplaint);
    setComplaintId(id);
    setIsSubmitted(true);
    
    toast({
      title: "Success",
      description: `Complaint submitted successfully with Reference Number: ${id}`,
    });
  };

  const handleTrack = () => {
    navigate(`/track?id=${complaintId}`);
  };

  const handleNewComplaint = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      description: "",
      location: "",
    });
  };

  const handleCopyRef = async () => {
    try {
      await copyToClipboard(complaintId);
      toast({
        title: "Success",
        description: "Reference number copied to clipboard!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy reference number",
        variant: "destructive",
      });
    }
  };

  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {!isSubmitted ? (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Submit Your Complaint</CardTitle>
              <CardDescription className="text-center">Fill out the form below to submit a new complaint</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Complaint Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Sanitation">Sanitation</SelectItem>
                        <SelectItem value="Public Transport">Public Transport</SelectItem>
                        <SelectItem value="Utilities">Utilities</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Complaint Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="attachment">Attach Files (optional)</Label>
                    <Input
                      id="attachment"
                      type="file"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button type="submit" className="w-full">Submit Complaint</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-center text-2xl text-green-600">Complaint Submitted Successfully!</CardTitle>
              <CardDescription className="text-center mt-2">
                Your complaint has been registered with Reference Number:
                <div className="flex items-center justify-center mt-2 gap-2">
                  <span className="font-bold text-xl">{complaintId}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleCopyRef} 
                    className="h-8 w-8 rounded-full"
                    title="Copy reference number"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </Button>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="mb-6">Please save this reference number for tracking your complaint status.</p>
              
              <Button onClick={handleTrack} className="mb-4 px-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Track Your Complaint
              </Button>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleNewComplaint} className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Submit Another Complaint
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Recent Complaints Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </svg>
            Your Recent Complaints
          </h2>
          
          <Card>
            <CardHeader className="bg-gray-50 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center font-medium text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  Recent submissions
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-full px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                  Refresh
                </Button>
              </div>
            </CardHeader>
            {recentComplaints.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left">Reference #</th>
                      <th className="px-4 py-3 text-left">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                          Date
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                            <line x1="7" y1="7" x2="7.01" y2="7" />
                          </svg>
                          Category
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                          Status
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-t hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-primary">{complaint.id}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => copyToClipboard(complaint.id)
                                .then(() => toast({ description: "Reference number copied to clipboard" }))
                                .catch(() => toast({ description: "Failed to copy", variant: "destructive" }))}
                              className="h-7 w-7 rounded-full"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                              </svg>
                            </Button>
                          </div>
                        </td>
                        <td className="px-4 py-3">{formatDate(complaint.submittedDate)}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{complaint.category}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`${getStatusColor(complaint.status)} text-white`}>
                            {complaint.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="rounded-full px-3"
                            onClick={() => navigate(`/track?id=${complaint.id}`)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.3-4.3" />
                            </svg>
                            Track
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <CardContent className="py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-muted-foreground mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <p className="text-muted-foreground mb-1">No recent complaints found</p>
                <p className="text-sm text-muted-foreground">Your submitted complaints will appear here</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
