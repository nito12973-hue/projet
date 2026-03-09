'use client';

import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:text-slate-200"
      aria-label="Changer le thème"
    >
      {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
    </button>
  );
}
