
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
        <nav className="bg-slate-900 text-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-6 h-6 mr-2"
                  >
                    <path d="M2 12s2-7 10-7 10 7 10 7-2 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-xl font-bold">CitizenConnect</span>
                </div>
                <button className="md:hidden" onClick={() => document.getElementById("mobile-menu")?.classList.toggle("hidden")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </button>
              </div>
              
              <div id="mobile-menu" className="hidden md:flex flex-col md:flex-row md:items-center mt-3 md:mt-0">
                <Button
                  variant={isActive("/") ? "secondary" : "ghost"}
                  className="mb-2 md:mb-0 md:ml-4 justify-start md:justify-center"
                  onClick={() => navigate("/")}
                >
                  Submit Complaint
                </Button>
                <Button
                  variant={isActive("/track") ? "secondary" : "ghost"}
                  className="mb-2 md:mb-0 md:ml-4 justify-start md:justify-center"
                  onClick={() => navigate("/track")}
                >
                  Track Status
                </Button>
                <Button
                  variant={isActive("/admin") ? "secondary" : "ghost"}
                  className="mb-2 md:mb-0 md:ml-4 justify-start md:justify-center"
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
