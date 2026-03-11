'use client';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ProfilePage from '@/app/profile/page';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  auth: { user: null, refreshUser: vi.fn() },
  updateProfile: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn()
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mocks.refresh })
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => mocks.auth
}));

vi.mock('@/services/api', () => ({
  updateProfile: (...args) => mocks.updateProfile(...args)
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
      <ProfilePage />
    </LanguageProvider>
  );
}

describe('ProfilePage', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.updateProfile.mockReset();
    mocks.updateProfile.mockResolvedValue({});
    mocks.toastSuccess.mockClear();
    mocks.toastError.mockClear();
    mocks.auth.user = null;
    mocks.auth.refreshUser = vi.fn().mockResolvedValue(null);
  });

  it('shows the french guest prompt when there is no active session', () => {
    renderPage('fr');

    expect(screen.getByText('Profil utilisateur')).toBeInTheDocument();
    expect(screen.getByText('Aucune session active.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Connecte-toi' })).toHaveAttribute('href', '/login');
  });

  it('renders user data in english and submits the trimmed payload', async () => {
    const user = userEvent.setup();
    mocks.auth.user = {
      name: 'Ada',
      email: 'ada@example.com',
      role: 'admin',
      approvalStatus: 'approved'
    };

    renderPage('en');

    expect(screen.getByText('User profile')).toBeInTheDocument();
    expect(screen.getByText('Administrator')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();

    const nameInput = screen.getByDisplayValue('Ada');
    const passwordInput = screen.getByPlaceholderText('New password (optional)');

    await user.clear(nameInput);
    await user.type(nameInput, '  Ada Lovelace  ');
    await user.type(passwordInput, 'strongpass123');
    await user.click(screen.getByRole('button', { name: 'Update profile' }));

    await waitFor(() => {
      expect(mocks.updateProfile).toHaveBeenCalledWith({
        name: 'Ada Lovelace',
        password: 'strongpass123'
      });
    });

    expect(mocks.auth.refreshUser).toHaveBeenCalledTimes(1);
    expect(mocks.toastSuccess).toHaveBeenCalledWith('Profile updated.');
  });
});