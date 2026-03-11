export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-6 max-w-3xl sm:mb-8">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">{eyebrow}</p>
      <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-slate-600 dark:text-slate-300">{description}</p>}
    </div>
  );
}
