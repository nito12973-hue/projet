'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Heart,
  ShoppingCart,
  UserCircle2,
  Menu as MenuIcon,
  X,
  ShoppingBag,
  LayoutGrid,
  Sparkles,
  ClipboardList,
  Settings as SettingsIcon
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { messages } = useLanguage();
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const primaryLinks = useMemo(
    () => [
      { href: '/', label: messages.navbar.home, Icon: Home },
      { href: '/products', label: messages.navbar.products, Icon: ShoppingBag },
      { href: '/categories', label: messages.navbar.categories, Icon: LayoutGrid },
      { href: '/products?tag=promotions', label: messages.navbar.promotions, Icon: Sparkles }
    ],
    [messages.navbar]
  );

  const accountLinks = useMemo(
    () => [
      { href: user ? '/profile' : '/register', label: messages.navbar.account, Icon: UserCircle2 },
      { href: '/orders', label: messages.navbar.orders, Icon: ClipboardList }
    ],
    [messages.navbar, user]
  );

  const utilityLinks = useMemo(
    () => [{ href: '/settings', label: messages.navbar.settings, Icon: SettingsIcon }],
    [messages.navbar]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-page flex min-h-20 flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:text-slate-200"
            aria-label="Ouvrir le menu"
          >
            <MenuIcon size={18} />
          </button>
          <Link href="/" className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Sunu<span className="text-[color:var(--accent-color)]">Market</span>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link href="/favorites" className="rounded-full border border-slate-200 p-2 dark:border-slate-700">
            <Heart size={18} />
          </Link>
          <Link href="/cart" className="relative rounded-full border border-slate-200 p-2 dark:border-slate-700">
            <ShoppingCart size={18} />
            <span className="absolute -right-1 -top-1 rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">{items.length}</span>
          </Link>
          <Link href="/profile" className="rounded-full border border-slate-200 p-2 dark:border-slate-700">
            <UserCircle2 size={18} />
          </Link>
        </div>
      </div>
      {sidebarOpen && (
        <div
          className={`sidebar-backdrop ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden={!sidebarOpen}
        />
      )}
      <aside className={`sidebar-panel ${sidebarOpen ? 'active' : ''}`} aria-hidden={!sidebarOpen}>
        <div className="sidebar-header">
          <div>
            <p className="sidebar-title">{messages.navbar.menu || messages.navbar.home}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">SunuMarket</p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-700 dark:text-slate-200"
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-6 pt-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">{messages.navbar.menu}</p>
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sidebar-link"
                onClick={() => setSidebarOpen(false)}
              >
                <link.Icon size={18} />
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">{messages.navbar.account}</p>
            {accountLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sidebar-link"
                onClick={() => setSidebarOpen(false)}
              >
                <link.Icon size={18} />
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Utilitaires</p>
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sidebar-link"
                onClick={() => setSidebarOpen(false)}
              >
                <link.Icon size={18} />
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="mt-auto space-y-2">
          {user ? (
            <button
              type="button"
              onClick={() => {
                setSidebarOpen(false);
                signOut();
              }}
              className="sidebar-link w-full justify-center bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            >
              {messages.navbar.logout}
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="sidebar-link w-full justify-center bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                onClick={() => setSidebarOpen(false)}
              >
                {messages.navbar.login}
              </Link>
              <Link
                href="/register"
                className="sidebar-link w-full justify-center bg-brand-500 text-white"
                onClick={() => setSidebarOpen(false)}
              >
                {messages.navbar.register}
              </Link>
            </>
          )}
        </div>
      </aside>
    </header>
  );
}
