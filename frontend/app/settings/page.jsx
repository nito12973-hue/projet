'use client';

import { useState } from 'react';
import { Moon, SunMedium, Languages, Zap, WifiOff, Bell, Type } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from 'next-themes';
import { useDesignSettings, ACCENT_PRESETS, PATTERN_PRESETS } from '@/context/DesignContext';

export default function SettingsPage() {
  const { locale, messages, changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [density, setDensity] = useState('comfy');
  const [textSize, setTextSize] = useState('base');
  const [dataSaver, setDataSaver] = useState(false);

  const t = messages.settingsPage;
  const { accent, setAccent, pattern, setPattern, accentConfig, patternConfig } = useDesignSettings();
  const accentEntries = Object.entries(ACCENT_PRESETS);
  const patternEntries = Object.entries(PATTERN_PRESETS);

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="responsive-grid">
        {/* Theme */}
        <div className="glass-panel p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{t.theme}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.themeDesc}</p>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">
              {theme === 'dark' ? 'Dark' : 'Light'}
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                theme === 'light'
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-200'
                  : 'border-slate-200 text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              <SunMedium size={16} />
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                theme === 'dark'
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-200'
                  : 'border-slate-200 text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              <Moon size={16} />
              Dark
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="glass-panel p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{t.language}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.languageDesc}</p>
            </div>
            <Languages className="text-brand-500" size={18} />
          </div>
          <div className="mt-4 flex gap-3">
            {['fr', 'en'].map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => changeLanguage(lng)}
                className={`flex flex-1 items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold uppercase transition ${
                  locale === lng
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-200'
                    : 'border-slate-200 text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>
        </div>

        {/* Accent palette */}
        <div className="glass-panel p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{t.accent}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.accentDesc}</p>
            </div>
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-200">{accentConfig.label}</span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {accentEntries.map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => setAccent(key)}
                aria-pressed={accent === key}
                className={`flex flex-col items-start gap-3 rounded-3xl border px-4 py-4 transition ${
                  accent === key
                    ? 'border-brand-500 bg-brand-50 text-slate-900 dark:border-brand-400 dark:bg-brand-500/10 dark:text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200'
                }`}
              >
                <div className="h-16 w-full rounded-2xl border border-white/40" style={{ backgroundImage: preset.gradient }} />
                <div className="flex w-full items-center justify-between text-sm font-semibold">
                  <span>{preset.label}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{key}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Background motif */}
        <div className="glass-panel p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{t.background}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.backgroundDesc}</p>
            </div>
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-200">{patternConfig.label}</span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {patternEntries.map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPattern(key)}
                aria-pressed={pattern === key}
                className={`flex flex-col items-start gap-3 rounded-3xl border px-4 py-4 transition ${
                  pattern === key
                    ? 'border-brand-500 bg-brand-50 text-slate-900 dark:border-brand-400 dark:bg-brand-500/10 dark:text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200'
                }`}
              >
                <div
                  className="h-20 w-full rounded-2xl border border-slate-200"
                  style={{ backgroundImage: preset.pattern, opacity: preset.opacity }}
                />
                <div className="flex w-full items-center justify-between text-sm font-semibold">
                  <span>{preset.label}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{Math.round(Number(preset.opacity) * 100)}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Density */}
        <div className="glass-panel p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{t.density}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.densityDesc}</p>
            </div>
            <Zap className="text-brand-500" size={18} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDensity('compact')}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                density === 'compact'
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-200'
                  : 'border-slate-200 text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              {t.compact}
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400">Liste plus serrée</p>
            </button>
            <button
              type="button"
              onClick={() => setDensity('comfy')}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                density === 'comfy'
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-200'
                  : 'border-slate-200 text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              {t.comfy}
              <p className="text-xs font-normal text-slate-500 dark:text-slate-400">Espaces plus confortables</p>
            </button>
          </div>
        </div>

        {/* Text size */}
        <div className="glass-panel p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{t.textSize}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.textSizeDesc}</p>
            </div>
            <Type className="text-brand-500" size={18} />
          </div>
          <div className="mt-4 flex gap-3">
            {['base', 'lg', 'xl'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setTextSize(size)}
                className={`flex flex-1 items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  textSize === size
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-200'
                    : 'border-slate-200 text-slate-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Data saver */}
        <div className="glass-panel p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{t.dataSaver}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.dataSaverDesc}</p>
            </div>
            <WifiOff className="text-brand-500" size={18} />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {dataSaver ? 'Activé' : 'Désactivé'}
            </span>
            <button
              type="button"
              onClick={() => setDataSaver((v) => !v)}
              className={`relative h-6 w-12 rounded-full transition ${
                dataSaver ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
              aria-pressed={dataSaver}
            >
              <span
                className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition ${
                  dataSaver ? 'right-[4px]' : 'left-[4px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-panel p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{t.notifications}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.notificationsDesc}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {t.comingSoon}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 opacity-70">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Bell size={16} />
              Push / email
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">en préparation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
