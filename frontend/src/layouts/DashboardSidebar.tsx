import { NavigationItem } from "../components/layout";
import { PROTECTED_ROUTES } from "../constants/routes";

interface DashboardSidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const NAVIGATION_ITEMS = [
  { label: "Dashboard", to: PROTECTED_ROUTES.DASHBOARD },
  { label: "Products", to: PROTECTED_ROUTES.PRODUCTS },
] as const;

export const DashboardSidebar = ({
  isOpen,
  onClose,
}: DashboardSidebarProps) => (
  <>
    {isOpen ? (
      <button
        aria-label="Close navigation"
        className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        onClick={onClose}
        type="button"
      />
    ) : null}

    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 -translate-x-full flex-col border-r border-slate-200 bg-white p-4 transition-transform lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : ""
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="flex flex-1 flex-col gap-2 pt-16 lg:pt-0"
      >
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationItem key={item.to} label={item.label} to={item.to} />
        ))}
      </nav>

      <button
        className="rounded-md px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        type="button"
      >
        Logout
      </button>
    </aside>
  </>
);
