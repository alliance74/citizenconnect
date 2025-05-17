import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ComplaintsProvider } from "../context/ComplaintsContext";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

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
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-3 group-hover:bg-primary/30 transition-colors">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6 text-primary"
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
                  className="md:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors" 
                  onClick={() => document.getElementById("mobile-menu")?.classList.toggle("hidden")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </button>
              </div>
              
              <div id="mobile-menu" className="hidden md:flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2">
                <Button
                  variant={isActive("/submit") ? "secondary" : "ghost"}
                  className="w-full md:w-auto justify-start md:justify-center bg-slate-700/50 hover:bg-slate-700 text-white"
                  onClick={() => navigate("/submit")}
                >
                  Submit Complaint
                </Button>
                <Button
                  variant={isActive("/track") ? "secondary" : "ghost"}
                  className="w-full md:w-auto justify-start md:justify-center bg-slate-700/50 hover:bg-slate-700 text-white"
                  onClick={() => navigate("/track")}
                >
                  Track Status
                </Button>
                <Button
                  variant={isActive("/admin") ? "secondary" : "ghost"}
                  className="w-full md:w-auto justify-start md:justify-center bg-slate-700/50 hover:bg-slate-700 text-white"
                  onClick={() => navigate("/admin")}
                >
                  Admin Dashboard
                </Button>
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
