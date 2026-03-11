'use client';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LoginPage from '@/app/login/page';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  auth: { signIn: vi.fn(), loading: false }
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

function renderPage(locale = 'fr') {
  window.localStorage.setItem(COOKIE_NAME, locale);

  return render(
    <LanguageProvider initialLocale={locale}>
      <LoginPage />
    </LanguageProvider>
  );
}

describe('LoginPage', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.auth.signIn.mockReset();
    mocks.auth.signIn.mockResolvedValue({});
    mocks.auth.loading = false;
  });

  it('renders the french login content and links', () => {
    renderPage('fr');

    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByText('Connecte-toi après validation admin de ton compte.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Créer un compte' })).toHaveAttribute('href', '/register');
    expect(screen.getByRole('link', { name: 'Mot de passe oublié' })).toHaveAttribute('href', '/forgot-password');
  });

  it('submits the english login form through signIn', async () => {
    const user = userEvent.setup();
    renderPage('en');

    await user.type(screen.getByPlaceholderText('Email'), 'mariama@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(mocks.auth.signIn).toHaveBeenCalledWith({
        email: 'mariama@example.com',
        password: 'secret123'
      });
    });
  });

  it('keeps the page stable when signIn rejects', async () => {
    const user = userEvent.setup();
    mocks.auth.signIn.mockRejectedValueOnce(new Error('Compte en attente de validation administrateur.'));
    renderPage('fr');

    await user.type(screen.getByPlaceholderText('Email'), 'mariama@example.com');
    await user.type(screen.getByPlaceholderText('Mot de passe'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Se connecter' }));

    await waitFor(() => {
      expect(mocks.auth.signIn).toHaveBeenCalledWith({
        email: 'mariama@example.com',
        password: 'secret123'
      });
    });

    expect(screen.getByText('Connexion')).toBeInTheDocument();
  });
});