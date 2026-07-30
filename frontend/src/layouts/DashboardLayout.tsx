import { useState } from "react";

import { DashboardContent } from "./DashboardContent";
import { DashboardFooter } from "./DashboardFooter";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen((isOpen) => !isOpen);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader onMenuToggle={toggleSidebar} />
        <DashboardContent />
        <DashboardFooter />
      </div>
    </div>
  );
};
