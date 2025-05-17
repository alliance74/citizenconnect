
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

export interface TimelineItem {
  date: string;
  status: string;
  details: string;
}

export interface Complaint {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  location: string;
  status: string;
  submittedDate: string;
  lastUpdated: string;
  contact: string;
  department: string;
  priority: string;
  progress: number;
  expectedResolution: string;
  timeline: TimelineItem[];
}

interface ComplaintsContextType {
  complaints: Complaint[];
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (id: string, updatedComplaint: Partial<Complaint>) => void;
  deleteComplaint: (id: string) => void;
  getComplaintById: (id: string) => Complaint | undefined;
}

const ComplaintsContext = createContext<ComplaintsContextType | undefined>(undefined);

export const useComplaints = (): ComplaintsContextType => {
  const context = useContext(ComplaintsContext);
  if (!context) {
    throw new Error("useComplaints must be used within a ComplaintsProvider");
  }
  return context;
};

export const ComplaintsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  
  useEffect(() => {
    const storedComplaints = localStorage.getItem("complaints");
    if (storedComplaints) {
      setComplaints(JSON.parse(storedComplaints));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const addComplaint = (complaint: Complaint) => {
    setComplaints((prevComplaints) => [complaint, ...prevComplaints]);
  };

  const updateComplaint = (id: string, updatedComplaint: Partial<Complaint>) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === id ? { ...complaint, ...updatedComplaint } : complaint
      )
    );
  };

  const deleteComplaint = (id: string) => {
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint.id !== id)
    );
  };

  const getComplaintById = (id: string) => {
    return complaints.find((complaint) => complaint.id === id);
  };

  return (
    <ComplaintsContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaint,
        deleteComplaint,
        getComplaintById,
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
};
