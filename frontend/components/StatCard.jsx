export default function StatCard({ label, value, helper }) {
  return (
    <div className="glass-panel p-6">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{value}</p>
      {helper && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helper}</p>}
    </div>
  );
}
