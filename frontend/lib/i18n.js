import { messages } from '@/lib/messages';

export const COOKIE_NAME = 'sunumarket-locale';
export const DEFAULT_LOCALE = 'fr';
export const LOCALES = ['fr', 'en'];

export function resolveLocale(value) {
  return LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

export function getMessages(locale) {
  return messages[resolveLocale(locale)];
}

export function getDateLocale(locale) {
  return resolveLocale(locale) === 'en' ? 'en-US' : 'fr-SN';
}

export function getAlternateLocale(locale) {
  return resolveLocale(locale) === 'fr' ? 'en' : 'fr';
}

