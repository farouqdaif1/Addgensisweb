import "./App.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "@/app/dashboard/dashboard";
import Advertisements from "@/app/Advertisements/Advertisements";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="dark">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/advertisements" element={<Advertisements />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default App;
