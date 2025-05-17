
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useComplaints } from "../context/ComplaintsContext";
import { formatDate, getStatusColor } from "../utils/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TrackStatus = () => {
  const location = useLocation();
  const { complaints } = useComplaints();
  const [trackingId, setTrackingId] = useState("");
  const [complaint, setComplaint] = useState<any>(null);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      setTrackingId(id);
      handleTrack(id);
    }
  }, [location.search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingId(e.target.value);
  
    setComplaint(null);
    setShowNotFound(false);
  };

  const handleTrack = (id: string = trackingId) => {
    const foundComplaint = complaints.find((c) => c.id === id);
    
    if (foundComplaint) {
      setComplaint(foundComplaint);
      setShowNotFound(false);
    } else {
      setComplaint(null);
      setShowNotFound(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Track Your Complaint
          </h1>
          <p className="text-muted-foreground">
            Enter your complaint reference number to check its current status
          </p>
        </div>
        
        <Card className="shadow-md mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              <div className="flex rounded-md overflow-hidden border shadow-sm">
                <div className="bg-gray-100 px-3 flex items-center border-r">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <Input 
                  type="text"
                  placeholder="Enter Reference Number (e.g., CMP123456)"
                  value={trackingId}
                  onChange={handleInputChange}
                  className="border-0 flex-1 focus-visible:ring-0"
                  required
                />
                <Button type="submit" className="rounded-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Track
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {complaint && (
          <Card className="shadow-md mb-6">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <CardTitle className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  Complaint Status
                </CardTitle>
                <Badge className={`${getStatusColor(complaint.status)} text-white px-4 py-1`}>
                  {complaint.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>Progress</span>
                  <span className="text-primary font-bold">{complaint.progress}%</span>
                </div>
                <Progress value={complaint.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Complaint Details */}
                <Card className="border bg-muted/20 shadow-none h-full">
                  <CardContent className="p-5">
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                        <path d="M10 9H8" />
                      </svg>
                      Complaint Details
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="text-primary mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                            <path d="M16 13H8" />
                            <path d="M16 17H8" />
                            <path d="M10 9H8" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Reference Number</div>
                          <div className="font-semibold">{complaint.id}</div>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="text-primary mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Submitted On</div>
                          <div className="font-semibold">{formatDate(complaint.submittedDate)}</div>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="text-primary mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                            <line x1="7" y1="7" x2="7.01" y2="7" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Category</div>
                          <div className="font-semibold">{complaint.category}</div>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="text-primary mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Location</div>
                          <div className="font-semibold">{complaint.location}</div>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

              
                <Card className="border bg-muted/20 shadow-none h-full">
                  <CardContent className="p-5">
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                      Current Status
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="text-primary mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Last Updated</div>
                          <div className="font-semibold">{formatDate(complaint.lastUpdated)}</div>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="text-primary mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="3" rx="2" />
                            <line x1="8" x2="16" y1="21" y2="21" />
                            <line x1="12" x2="12" y1="17" y2="21" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Assigned Department</div>
                          <div className="font-semibold">{complaint.department}</div>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="text-primary mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="m9 16 2 2 4-4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Expected Resolution</div>
                          <div className="font-semibold">{formatDate(complaint.expectedResolution)}</div>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Status Timeline */}
              <div className="mt-6">
                <h3 className="font-bold text-primary flex items-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  Status Timeline
                </h3>
                <div className="bg-muted/20 rounded-lg p-4">
                  {complaint.timeline.map((item: any, index: number) => (
                    <div key={index} className={`${index !== complaint.timeline.length - 1 ? "border-b pb-4 mb-4" : ""}`}>
                      <div className="text-sm text-muted-foreground mb-1">{item.date}</div>
                      <div className="font-semibold mb-1">{item.status}</div>
                      <div className="text-muted-foreground">{item.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {showNotFound && (
          <div className="text-center mt-8">
            <Card className="border-warning bg-warning/10">
              <CardContent className="pt-6 pb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-warning mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                <h2 className="text-xl font-bold mb-2">No complaint found</h2>
                <p className="mb-2">We couldn't find any complaint with this reference number.</p>
                <p className="text-sm mb-6">Please check the number and try again, or submit a new complaint.</p>
                
                <Button onClick={() => window.location.href = "/"}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                  Submit New Complaint
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackStatus;
