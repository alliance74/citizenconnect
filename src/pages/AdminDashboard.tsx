import { useState, useEffect } from "react";
import { useComplaints } from "../context/ComplaintsContext";
import { formatDate, getStatusColor, copyToClipboard } from "../utils/helpers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const AdminDashboard = () => {
  const { complaints, updateComplaint, deleteComplaint } = useComplaints();
  const { toast } = useToast();
  const [filteredComplaints, setFilteredComplaints] = useState(complaints);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");


  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [statusResponse, setStatusResponse] = useState("");

  useEffect(() => {
    filterComplaints();
  }, [complaints, searchQuery, statusFilter, departmentFilter, sortBy]);

  const stats = {
    new: complaints.filter(c => c.status.toLowerCase() === 'new').length,
    inProgress: complaints.filter(c => c.status.toLowerCase() === 'in progress').length,
    resolved: complaints.filter(c => c.status.toLowerCase() === 'resolved').length,
    urgent: complaints.filter(c => c.status.toLowerCase() === 'urgent').length
  };

  const filterComplaints = () => {
    let filtered = [...complaints];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.id.toLowerCase().includes(query) ||
        (c.name && c.name.toLowerCase().includes(query)) ||
        c.description.toLowerCase().includes(query) ||
        c.contact.toLowerCase().includes(query) ||
        (c.location && c.location.toLowerCase().includes(query))
      );
    }

  
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(c => c.department.toLowerCase().includes(departmentFilter.toLowerCase()));
    }

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'date':
          return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        case 'priority':
          const priorityWeight: Record<string, number> = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredComplaints(filtered);
  };

  const handleViewDetails = (complaintId: string) => {
    setSelectedComplaintId(complaintId);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (complaintId: string) => {
    setSelectedComplaintId(complaintId);
    setStatusResponse("");
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteComplaint = (complaintId: string) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      deleteComplaint(complaintId);
      toast({
        title: "Success",
        description: "Complaint deleted successfully",
      });
    }
  };

  const saveStatusUpdate = () => {
    if (!selectedComplaintId || !statusResponse.trim()) {
      toast({
        title: "Error",
        description: "Please provide resolution details",
        variant: "destructive",
      });
      return;
    }

    const complaint = complaints.find(c => c.id === selectedComplaintId);
    if (complaint) {
      const updatedComplaint = {
        status: "Resolved",
        lastUpdated: new Date().toISOString().split('T')[0],
        progress: 100,
        timeline: [
          ...complaint.timeline,
          {
            date: new Date().toLocaleString(),
            status: "Resolved",
            details: statusResponse || "Complaint resolved by admin"
          }
        ]
      };

      updateComplaint(selectedComplaintId, updatedComplaint);
      
      toast({
        title: "Success",
        description: "Complaint resolved successfully",
      });

      setIsUpdateDialogOpen(false);
    }
  };

  const selectedComplaint = selectedComplaintId ? complaints.find(c => c.id === selectedComplaintId) : null;

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex">
            <div className="flex-1 mr-2">
              <Input
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="priority">Sort by Priority</SelectItem>
                <SelectItem value="status">Sort by Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="flex-1 h-10">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="flex-1 h-10">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="public works">Public Works</SelectItem>
                <SelectItem value="sanitation">Sanitation Department</SelectItem>
                <SelectItem value="transportation">Transportation Department</SelectItem>
                <SelectItem value="utility">Utility Services</SelectItem>
                <SelectItem value="general">General Administration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-600">{stats.new}</span>
                <span className="text-blue-600">New Complaints</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-100">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-amber-600">{stats.inProgress}</span>
                <span className="text-amber-600">In Progress</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-600">{stats.resolved}</span>
                <span className="text-green-600">Resolved</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-red-600">{stats.urgent}</span>
                <span className="text-red-600">Urgent</span>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <Card>
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle>Complaints List</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center">
                        <div className="flex flex-col items-center text-muted-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          <p>No complaints found matching your filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-t">
                        <td className="px-4 py-3">{formatDate(complaint.submittedDate)}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{complaint.category}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="max-w-[200px] truncate" title={complaint.description}>
                            {complaint.description}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`${getStatusColor(complaint.status)} text-white`}>
                            {complaint.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">{complaint.contact}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleUpdateStatus(complaint.id)}
                              className="h-8 w-8"
                              title="Update status"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleViewDetails(complaint.id)}
                              className="h-8 w-8"
                              title="View details"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleDeleteComplaint(complaint.id)}
                              className="h-8 w-8"
                              title="Delete"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              </svg>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

    
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resolve Complaint</DialogTitle>
            <DialogDescription>
              Provide resolution details to mark this complaint as resolved.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="statusResponse">Response/Resolution Details</Label>
              <Textarea
                id="statusResponse"
                rows={3}
                value={statusResponse}
                onChange={(e) => setStatusResponse(e.target.value)}
                placeholder="Enter resolution details..."
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveStatusUpdate} className="bg-green-600 hover:bg-green-700">
              Resolve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="mb-1"><span className="font-bold">Reference ID:</span> {selectedComplaint.id}</p>
                  <p className="mb-1"><span className="font-bold">Submitted:</span> {formatDate(selectedComplaint.submittedDate)}</p>
                  <p className="mb-1"><span className="font-bold">Status:</span> <Badge className={`${getStatusColor(selectedComplaint.status)} text-white ml-2`}>{selectedComplaint.status}</Badge></p>
                </div>
                <div>
                  <p className="mb-1"><span className="font-bold">Category:</span> {selectedComplaint.category}</p>
                  <p className="mb-1"><span className="font-bold">Department:</span> {selectedComplaint.department}</p>
                  <p className="mb-1"><span className="font-bold">Priority:</span> {selectedComplaint.priority}</p>
                </div>
              </div>
              
              <Card className="mb-4">
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedComplaint.description}</p>
                </CardContent>
              </Card>
              
              <Card className="mb-4">
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-1"><span className="font-bold">Name:</span> {selectedComplaint.name || 'Not provided'}</p>
                  <p className="mb-1"><span className="font-bold">Email:</span> {selectedComplaint.email || selectedComplaint.contact}</p>
                  <p className="mb-1"><span className="font-bold">Phone:</span> {selectedComplaint.phone || 'Not provided'}</p>
                  <p className="mb-1"><span className="font-bold">Location:</span> {selectedComplaint.location}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {selectedComplaint.timeline.map((item, index) => (
                      <div key={index} className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{item.date}</p>
                        <p className="font-bold mb-1">{item.status}</p>
                        <p>{item.details}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              if (selectedComplaintId) {
                handleUpdateStatus(selectedComplaintId);
              }
            }}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
