'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { COOKIE_NAME, DEFAULT_LOCALE, getMessages, resolveLocale } from '@/lib/i18n';

const LanguageContext = createContext(null);

function persistLocale(locale) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COOKIE_NAME, locale);
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
  document.documentElement.lang = locale;
}

export function LanguageProvider({ children, initialLocale = DEFAULT_LOCALE }) {
  const router = useRouter();
  const [locale, setLocale] = useState(resolveLocale(initialLocale));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedLocale = resolveLocale(window.localStorage.getItem(COOKIE_NAME));
    persistLocale(storedLocale);
    if (storedLocale !== locale) {
      setLocale(storedLocale);
      router.refresh();
    }
  }, [locale, router]);

  const changeLanguage = (value) => {
    const nextLocale = resolveLocale(value);
    if (nextLocale === locale) return;
    persistLocale(nextLocale);
    setLocale(nextLocale);
    router.refresh();
  };

  const value = useMemo(() => ({ locale, messages: getMessages(locale), changeLanguage }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage doit être utilisé dans LanguageProvider.');
  return context;
}

