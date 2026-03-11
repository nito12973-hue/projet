import { cookies } from 'next/headers';
import { COOKIE_NAME, resolveLocale } from '@/lib/i18n';

export function getCurrentLocale() {
  return resolveLocale(cookies().get(COOKIE_NAME)?.value);
}

