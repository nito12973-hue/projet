'use client';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ResetPasswordPage from '@/app/reset-password/[token]/page';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  resetPassword: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn()
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mocks.refresh })
}));

vi.mock('@/services/api', () => ({
  resetPassword: (...args) => mocks.resetPassword(...args)
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
      <ResetPasswordPage params={{ token: 'secure-token-123' }} />
    </LanguageProvider>
  );
}

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.resetPassword.mockReset();
    mocks.resetPassword.mockResolvedValue({});
    mocks.toastSuccess.mockClear();
    mocks.toastError.mockClear();
  });

  it('submits the english reset form, shows the token and clears the field', async () => {
    const user = userEvent.setup();
    renderPage('en');

    const passwordInput = screen.getByPlaceholderText('New password');
    expect(screen.getByText(/secure-token-123/)).toBeInTheDocument();

    await user.type(passwordInput, 'newstrongpass');
    await user.click(screen.getByRole('button', { name: 'Update password' }));

    await waitFor(() => {
      expect(mocks.resetPassword).toHaveBeenCalledWith('secure-token-123', { password: 'newstrongpass' });
    });

    expect(mocks.toastSuccess).toHaveBeenCalledWith('Password updated.');
    expect(passwordInput).toHaveValue('');
  });
});