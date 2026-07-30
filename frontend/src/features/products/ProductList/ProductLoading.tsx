import { Skeleton } from "../../../components/ui";

export const ProductLoading = () => (
  <div className="space-y-4">
    {/* Simulate search bar */}
    <Skeleton className="h-10 w-full max-w-sm rounded-lg" />
    
    {/* Simulate table */}
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-100 p-4">
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="divide-y divide-slate-200">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="p-4" key={i}>
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
