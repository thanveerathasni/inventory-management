interface SkeletonProps {
  readonly className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
);
