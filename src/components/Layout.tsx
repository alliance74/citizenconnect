import { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { ComplaintsProvider } from "../context/ComplaintsContext";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/submit", label: "Submit Complaint" },
    { path: "/track", label: "Track Status" },
    { path: "/admin", label: "Admin Dashboard" },
  ];

  return (
    <ComplaintsProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <nav className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center cursor-pointer group" 
                  onClick={() => navigate("/")}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6 text-white"
                    >
                      <path d="M2 12s2-7 10-7 10 7 10 7-2 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    CitizenConnect
                  </span>
                </div>
                <button 
                  className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </button>
              </div>
              
              <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2`}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={`w-full md:w-auto justify-start md:justify-center px-4 py-2 rounded-md transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-white text-slate-900 hover:bg-slate-100 font-medium'
                        : 'text-white hover:bg-white/10'
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </ComplaintsProvider>
  );
};

export default Layout;
