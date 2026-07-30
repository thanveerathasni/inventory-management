import { NavLink } from "react-router-dom";

interface NavigationItemProps {
  readonly label: string;
  readonly to: string;
}

export const NavigationItem = ({ label, to }: NavigationItemProps) => (
  <NavLink
    className={({ isActive }) =>
      [
        "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      ].join(" ")
    }
    to={to}
  >
    {label}
  </NavLink>
);
