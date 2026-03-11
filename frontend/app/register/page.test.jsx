'use client';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import RegisterPage from '@/app/register/page';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  auth: { signUp: vi.fn(), loading: false }
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
      <RegisterPage />
    </LanguageProvider>
  );
}

describe('RegisterPage', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.auth.signUp.mockReset();
    mocks.auth.signUp.mockResolvedValue({});
    mocks.auth.loading = false;
  });

  it('renders the french register copy and login link', () => {
    renderPage('fr');

    expect(screen.getByText('Créer un compte')).toBeInTheDocument();
    expect(screen.getByText('Après vérification e-mail, le compte sera validé par l’administrateur.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Se connecter' })).toHaveAttribute('href', '/login');
  });

  it('submits the english register form through signUp', async () => {
    const user = userEvent.setup();
    renderPage('en');

    await user.type(screen.getByPlaceholderText('Full name'), 'Ada Lovelace');
    await user.type(screen.getByPlaceholderText('Email'), 'ada@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'strongpass123');
    await user.click(screen.getByRole('button', { name: 'Create my account' }));

    await waitFor(() => {
      expect(mocks.auth.signUp).toHaveBeenCalledWith({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        password: 'strongpass123'
      });
    });
  });

  it('keeps the page stable when signUp rejects', async () => {
    const user = userEvent.setup();
    mocks.auth.signUp.mockRejectedValueOnce(new Error('Compte en attente de validation administrateur.'));
    renderPage('fr');

    await user.type(screen.getByPlaceholderText('Nom complet'), 'Moussa Fall');
    await user.type(screen.getByPlaceholderText('Email'), 'moussa@example.com');
    await user.type(screen.getByPlaceholderText('Mot de passe'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    await waitFor(() => {
      expect(mocks.auth.signUp).toHaveBeenCalledWith({
        name: 'Moussa Fall',
        email: 'moussa@example.com',
        password: 'secret123'
      });
    });

    expect(screen.getByText('Créer un compte')).toBeInTheDocument();
  });
});