'use client';

import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import VerifyEmailPage from '@/app/verify-email/[token]/page';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  verifyEmail: vi.fn()
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mocks.refresh })
}));

vi.mock('@/services/api', () => ({
  verifyEmail: (...args) => mocks.verifyEmail(...args)
}));

function renderPage(locale = 'fr', token = 'verify-token') {
  window.localStorage.setItem(COOKIE_NAME, locale);

  return render(
    <LanguageProvider initialLocale={locale}>
      <VerifyEmailPage params={{ token }} />
    </LanguageProvider>
  );
}

describe('VerifyEmailPage', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.verifyEmail.mockReset();
  });

  it('renders the french loading and success states after email verification', async () => {
    mocks.verifyEmail.mockResolvedValue({
      message: 'Email confirmé. Le compte attend maintenant la validation administrateur.'
    });

    renderPage('fr', 'token-fr');

    expect(screen.getByText('Confirmation d’email')).toBeInTheDocument();
    expect(screen.getByText('Vérification en cours...')).toBeInTheDocument();

    await waitFor(() => {
      expect(mocks.verifyEmail).toHaveBeenCalledWith('token-fr');
    });

    expect(screen.getByText('Email confirmé. Le compte attend maintenant la validation administrateur.')).toBeInTheDocument();
    expect(screen.getByText('Prochaine étape : validation du compte par l’administrateur.')).toBeInTheDocument();
  });

  it('renders the english error message when the token is invalid', async () => {
    mocks.verifyEmail.mockRejectedValue(new Error('Invalid verification token.'));

    renderPage('en', 'bad-token');

    expect(screen.getByText('Email confirmation')).toBeInTheDocument();
    expect(screen.getByText('Verification in progress...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Invalid verification token.')).toBeInTheDocument();
    });
  });
});