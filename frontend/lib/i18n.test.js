import { describe, expect, it } from 'vitest';
import { getAlternateLocale, getDateLocale, getMessages, resolveLocale } from '@/lib/i18n';

describe('i18n helpers', () => {
  it('resolves unsupported locales to french by default', () => {
    expect(resolveLocale('fr')).toBe('fr');
    expect(resolveLocale('en')).toBe('en');
    expect(resolveLocale('de')).toBe('fr');
    expect(resolveLocale(undefined)).toBe('fr');
  });

  it('returns the matching translated message set', () => {
    expect(getMessages('en').login.title).toBe('Login');
    expect(getMessages('fr').login.title).toBe('Connexion');
    expect(getMessages('unknown').login.title).toBe('Connexion');
  });

  it('computes date and alternate locales consistently', () => {
    expect(getDateLocale('fr')).toBe('fr-SN');
    expect(getDateLocale('en')).toBe('en-US');
    expect(getAlternateLocale('fr')).toBe('en');
    expect(getAlternateLocale('en')).toBe('fr');
  });
});