import { Outlet } from "react-router-dom";

export const DashboardContent = () => (
  <main className="flex-1 overflow-auto bg-slate-50 p-4 lg:p-6">
    <Outlet />
  </main>
);
