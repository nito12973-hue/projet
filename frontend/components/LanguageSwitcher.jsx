'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { locale, messages, changeLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" aria-label={messages.switcher.label}>
      <button
        type="button"
        onClick={() => changeLanguage('fr')}
        className={`rounded-full px-2.5 py-1.5 transition ${locale === 'fr' ? 'bg-brand-500 text-white' : 'hover:text-brand-500'}`}
      >
        {messages.switcher.fr}
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`rounded-full px-2.5 py-1.5 transition ${locale === 'en' ? 'bg-brand-500 text-white' : 'hover:text-brand-500'}`}
      >
        {messages.switcher.en}
      </button>
    </div>
  );
}

