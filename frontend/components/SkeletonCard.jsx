export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[2rem] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-[4/3] rounded-[1.5rem] bg-slate-200 dark:bg-slate-800" />
      <div className="mt-4 h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-3 h-6 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-3 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-2 h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
