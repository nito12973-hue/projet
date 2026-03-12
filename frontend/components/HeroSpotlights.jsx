'use client';

import Link from 'next/link';
import { Archive, Compass, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const iconMap = {
  curated: Sparkles,
  local: Compass,
  trusted: ShieldCheck,
  express: Archive
};

export default function HeroSpotlights() {
  const { messages } = useLanguage();
  const { heroSpotlights: t } = messages;

  return (
    <section className="section-spacing">
      <div className="container-page space-y-4">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">{t.eyebrow}</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">{t.title}</h2>
          <p className="max-w-3xl mx-auto text-sm text-slate-500 dark:text-slate-400 sm:text-base">{t.description}</p>
        </div>
        <div className="spotlight-grid">
          {t.items.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
          <Link key={item.title} href={item.href} className="spotlight-card">
                <span className="spotlight-card-badge">{item.badge}</span>
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-[color:var(--accent-color)]" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                <span className="spotlight-card-cta">{t.cta}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
