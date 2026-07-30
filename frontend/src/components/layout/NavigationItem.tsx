import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavigationItemProps {
  readonly icon?: ReactNode;
  readonly label: string;
  readonly to: string;
}

export const NavigationItem = ({ icon, label, to }: NavigationItemProps) => (
  <NavLink
    className={({ isActive }) =>
      [
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      ].join(" ")
    }
    to={to}
  >
    {icon ? <span className="flex-shrink-0">{icon}</span> : null}
    {label}
  </NavLink>
);
