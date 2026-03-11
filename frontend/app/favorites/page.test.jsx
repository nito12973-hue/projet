'use client';

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FavoritesPage from '@/app/favorites/page';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  auth: { user: null },
  favorites: { favorites: [], loading: false }
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

vi.mock('@/context/FavoritesContext', () => ({
  useFavorites: () => mocks.favorites
}));

vi.mock('@/components/SectionHeading', () => ({
  default: ({ eyebrow, title, description }) => (
    <header>
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  )
}));

vi.mock('@/components/ProductCard', () => ({
  default: ({ product }) => <article data-testid="product-card">{product.name}</article>
}));

function renderPage(locale = 'fr') {
  window.localStorage.setItem(COOKIE_NAME, locale);

  return render(
    <LanguageProvider initialLocale={locale}>
      <FavoritesPage />
    </LanguageProvider>
  );
}

describe('FavoritesPage', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.auth.user = null;
    mocks.favorites = { favorites: [], loading: false };
  });

  it('shows the french login call-to-action when the user is not signed in', () => {
    renderPage('fr');

    expect(screen.getByText('Produits sauvegardés par l’utilisateur')).toBeInTheDocument();
    expect(screen.getByText('Connecte-toi pour voir tes favoris')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Connexion' })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('link', { name: 'Créer un compte' })).toHaveAttribute('href', '/register');
  });

  it('shows the english loading state for authenticated users', () => {
    mocks.auth.user = { _id: 'user-1' };
    mocks.favorites = { favorites: [], loading: true };

    renderPage('en');

    expect(screen.getByText('Products saved by the user')).toBeInTheDocument();
    expect(screen.getByText('Loading favorites...')).toBeInTheDocument();
  });

  it('shows the english empty state when there are no favorites', () => {
    mocks.auth.user = { _id: 'user-1' };

    renderPage('en');

    expect(screen.getByText('No favorites yet')).toBeInTheDocument();
    expect(screen.getByText('Browse the store and save the products you are interested in.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse products' })).toHaveAttribute('href', '/products');
  });

  it('renders the favorite product cards when data is available', () => {
    mocks.auth.user = { _id: 'user-1' };
    mocks.favorites = {
      favorites: [
        { _id: 'p1', name: 'Laptop Pro' },
        { _id: 'p2', name: 'Wireless Earbuds' }
      ],
      loading: false
    };

    renderPage('en');

    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    expect(screen.getByText('Laptop Pro')).toBeInTheDocument();
    expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument();
  });
});