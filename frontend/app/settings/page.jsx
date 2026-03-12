'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import SectionHeading from '@/components/SectionHeading';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const TEXT_SIZES = [
  { label: 'Base', value: 'base' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' }
];

export default function SettingsPage() {
  const { messages } = useLanguage();
  const { user, signOut } = useAuth();
  const [textSize, setTextSize] = useState('base');
  const [dataSaver, setDataSaver] = useState(false);
  const t = messages.settingsPage;

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.languageTitle}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.languageDesc}</p>
            </div>
            <LanguageSwitcher />
          </div>

          <div className="glass-panel p-6 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.preferencesTitle}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.preferencesDesc}</p>
            </div>
            <div className="flex gap-3">
              {TEXT_SIZES.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => setTextSize(size.value)}
                  className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    textSize === size.value
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-white'
                      : 'border-slate-200 text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.dataSaver}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.dataSaverDesc}</p>
              </div>
              <button
                type="button"
                onClick={() => setDataSaver((prev) => !prev)}
                className={`relative h-6 w-12 rounded-full transition ${dataSaver ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                aria-pressed={dataSaver}
              >
                <span
                  className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition ${dataSaver ? 'right-[4px]' : 'left-[4px]'}`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.accountTitle}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.accountDesc}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/70">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">{user?.name ?? t.guestName}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email ?? t.guestEmail}</p>
                </div>
                <Link href="/profile" className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                  {t.manageAccount}
                </Link>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/profile"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-500 dark:border-slate-700 dark:text-slate-100"
                >
                  {t.manageAccount}
                </Link>
                <Link
                  href="/reset-password"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-500 dark:border-slate-700 dark:text-slate-100"
                >
                  {t.changePassword}
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                >
                  {t.logout}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
