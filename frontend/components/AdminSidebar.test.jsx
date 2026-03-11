'use client';

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AdminSidebar from '@/components/AdminSidebar';
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

function renderSidebar(locale = 'fr') {
  window.localStorage.setItem(COOKIE_NAME, locale);

  return render(
    <LanguageProvider initialLocale={locale}>
      <AdminSidebar />
    </LanguageProvider>
  );
}

describe('AdminSidebar', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
  });

  it('renders french admin navigation links', () => {
    renderSidebar('fr');

    expect(screen.getByText('Administration')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dashboard/i })).toHaveAttribute('href', '/admin');
    expect(screen.getByRole('link', { name: /Produits/i })).toHaveAttribute('href', '/admin/products');
    expect(screen.getByRole('link', { name: /Commandes/i })).toHaveAttribute('href', '/admin/orders');
    expect(screen.getByRole('link', { name: /Utilisateurs/i })).toHaveAttribute('href', '/admin/users');
  });

  it('renders english admin navigation links', () => {
    renderSidebar('en');

    expect(screen.getByText('Administration')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/admin/products');
    expect(screen.getByRole('link', { name: 'Orders' })).toHaveAttribute('href', '/admin/orders');
    expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute('href', '/admin/users');
  });
});