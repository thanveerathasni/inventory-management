interface UserMenuProps {
  readonly userName?: string;
}

export const UserMenu = ({ userName = "User" }: UserMenuProps) => (
  <button
    aria-label="User menu"
    className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
    type="button"
  >
    {userName}
  </button>
);
