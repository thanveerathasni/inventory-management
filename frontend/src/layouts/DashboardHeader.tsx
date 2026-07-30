import { Logo, UserMenu } from "../components/layout";

interface DashboardHeaderProps {
  readonly onMenuToggle: () => void;
}

export const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => (
  <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
    <div className="flex items-center gap-3">
      <button
        aria-label="Toggle navigation"
        className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
        onClick={onMenuToggle}
        type="button"
      >
        Menu
      </button>
      <Logo />
    </div>

    <UserMenu />
  </header>
);
