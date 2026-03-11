'use client';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ForgotPasswordPage from '@/app/forgot-password/page';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  requestPasswordReset: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn()
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mocks.refresh })
}));

vi.mock('@/services/api', () => ({
  requestPasswordReset: (...args) => mocks.requestPasswordReset(...args)
}));

vi.mock('sonner', () => ({
  toast: {
    success: (...args) => mocks.toastSuccess(...args),
    error: (...args) => mocks.toastError(...args)
  }
}));

function renderPage(locale = 'fr') {
  window.localStorage.setItem(COOKIE_NAME, locale);

  return render(
    <LanguageProvider initialLocale={locale}>
      <ForgotPasswordPage />
    </LanguageProvider>
  );
}

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.requestPasswordReset.mockReset();
    mocks.requestPasswordReset.mockResolvedValue({});
    mocks.toastSuccess.mockClear();
    mocks.toastError.mockClear();
  });

  it('submits the french reset request form and shows the success toast', async () => {
    const user = userEvent.setup();
    renderPage('fr');

    expect(screen.getByText('Mot de passe oublié')).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Ton email'), 'fatou@example.com');
    await user.click(screen.getByRole('button', { name: 'Envoyer le lien' }));

    await waitFor(() => {
      expect(mocks.requestPasswordReset).toHaveBeenCalledWith({ email: 'fatou@example.com' });
    });

    expect(mocks.toastSuccess).toHaveBeenCalledWith('Email de réinitialisation envoyé.');
  });
});