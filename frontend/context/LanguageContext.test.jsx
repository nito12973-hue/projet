'use client';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn()
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mocks.refresh })
}));

function Probe() {
  const { locale, messages } = useLanguage();

  return (
    <>
      <span data-testid="locale">{locale}</span>
      <span data-testid="switcher-label">{messages.switcher.label}</span>
    </>
  );
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
  });

  it('hydrates locale from localStorage and refreshes server content when needed', async () => {
    window.localStorage.setItem(COOKIE_NAME, 'en');

    render(
      <LanguageProvider initialLocale="fr">
        <Probe />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('locale')).toHaveTextContent('en');
    });

    expect(screen.getByTestId('switcher-label')).toHaveTextContent('Language');
    expect(document.documentElement.lang).toBe('en');
    expect(document.cookie).toContain(`${COOKIE_NAME}=en`);
    expect(mocks.refresh).toHaveBeenCalledTimes(1);
  });

  it('changes language from the switcher and persists the new locale', async () => {
    const user = userEvent.setup();

    render(
      <LanguageProvider initialLocale="fr">
        <LanguageSwitcher />
        <Probe />
      </LanguageProvider>
    );

    await user.click(screen.getByRole('button', { name: 'EN' }));

    await waitFor(() => {
      expect(screen.getByTestId('locale')).toHaveTextContent('en');
    });

    expect(screen.getByLabelText('Language')).toBeInTheDocument();
    expect(window.localStorage.getItem(COOKIE_NAME)).toBe('en');
    expect(document.cookie).toContain(`${COOKIE_NAME}=en`);
    expect(document.documentElement.lang).toBe('en');
    expect(mocks.refresh).toHaveBeenCalledTimes(1);
  });
});