'use client';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ProductBrowser from '@/components/ProductBrowser';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn()
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mocks.refresh })
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>
}));

vi.mock('@/components/ProductCard', () => ({
  default: ({ product }) => <article data-testid="product-card">{product.name}</article>
}));

const categories = [
  { slug: 'audio', name: 'Audio' },
  { slug: 'network', name: 'Network' },
  { slug: 'computing', name: 'Computing' }
];

const products = [
  { _id: 'p1', name: 'Wireless Earbuds', description: 'Bluetooth audio for Dakar commutes', category: { slug: 'audio' } },
  { _id: 'p2', name: 'Wireless Router', description: 'Fast network for home and office', category: { slug: 'network' } },
  { _id: 'p3', name: 'Laptop Pro', description: 'Portable computer for work', category: { slug: 'computing' } },
  { _id: 'p4', name: 'Phone Stand', description: 'Desk accessory', category: { slug: 'audio' } },
  { _id: 'p5', name: 'Travel Mouse', description: 'Compact accessory', category: { slug: 'computing' } },
  { _id: 'p6', name: 'Mechanical Keyboard', description: 'Comfortable typing', category: { slug: 'computing' } },
  { _id: 'p7', name: 'USB-C Hub', description: 'Extra ports on the go', category: { slug: 'computing' } }
];

function renderBrowser(locale = 'en', props = {}) {
  window.localStorage.setItem(COOKIE_NAME, locale);

  return render(
    <LanguageProvider initialLocale={locale}>
      <ProductBrowser products={products} categories={categories} {...props} />
    </LanguageProvider>
  );
}

describe('ProductBrowser', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
  });

  it('filters products with the search query and category selector', async () => {
    const user = userEvent.setup();
    renderBrowser('en');

    await user.type(screen.getByPlaceholderText('Search for a product...'), 'wireless');

    expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument();
    expect(screen.getByText('Wireless Router')).toBeInTheDocument();
    expect(screen.getByText('2 product(s) found')).toBeInTheDocument();

    await user.selectOptions(screen.getByRole('combobox'), 'audio');

    expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument();
    expect(screen.queryByText('Wireless Router')).not.toBeInTheDocument();
    expect(screen.getByText('1 product(s) found')).toBeInTheDocument();
  });

  it('shows the french empty state and CTA links when no product matches', async () => {
    const user = userEvent.setup();
    renderBrowser('fr');

    await user.type(screen.getByPlaceholderText('Rechercher un produit...'), 'inexistant');

    expect(screen.getByText('Aucun produit disponible pour le moment')).toBeInTheDocument();
    expect(screen.getByText('Ajoute le premier produit et ses prix en FCFA depuis l’espace admin pour lancer la boutique.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ajouter un produit' })).toHaveAttribute('href', '/admin/products');
    expect(screen.getByRole('link', { name: 'Créer un compte' })).toHaveAttribute('href', '/register');
    expect(screen.getByText('0 produit(s) trouvé(s)')).toBeInTheDocument();
  });

  it('paginates the product list and moves between pages', async () => {
    const user = userEvent.setup();
    renderBrowser('en');

    expect(screen.getAllByTestId('product-card')).toHaveLength(6);
    expect(screen.getByText('Page 1 / 2')).toBeInTheDocument();
    expect(screen.queryByText('USB-C Hub')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('Page 2 / 2')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(1);
    expect(screen.getByText('USB-C Hub')).toBeInTheDocument();
    expect(screen.queryByText('Wireless Earbuds')).not.toBeInTheDocument();
  });
});