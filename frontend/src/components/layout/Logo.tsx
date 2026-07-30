import { NavLink } from "react-router-dom";

import { PROTECTED_ROUTES } from "../../constants/routes";

export const Logo = () => (
  <NavLink
    className="text-lg font-semibold tracking-tight text-slate-900"
    to={PROTECTED_ROUTES.DASHBOARD}
  >
    Inventory Management
  </NavLink>
);
