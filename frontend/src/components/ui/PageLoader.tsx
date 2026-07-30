import { Spinner } from "./Spinner";

interface PageLoaderProps {
  readonly message?: string;
}

export const PageLoader = ({ message = "Loading..." }: PageLoaderProps) => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
    <Spinner className="text-slate-400" size={32} />
    <p className="text-sm font-medium text-slate-500" role="status">
      {message}
    </p>
  </div>
);
