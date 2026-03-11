'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, UserCircle2 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { messages } = useLanguage();
  const { user, signOut } = useAuth();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-page flex min-h-20 flex-wrap items-center justify-between gap-3 py-3">
        <Link href="/" className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">Sunu<span className="text-brand-500">Market</span></Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300">{messages.navbar.products}</Link>
          <Link href="/categories" className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300">{messages.navbar.categories}</Link>
          <Link href="/favorites" className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300">{messages.navbar.favorites}</Link>
          <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300">{messages.navbar.admin}</Link>
        </nav>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/favorites" className="rounded-full border border-slate-200 p-2 dark:border-slate-700"><Heart size={18} /></Link>
          <Link href="/cart" className="relative rounded-full border border-slate-200 p-2 dark:border-slate-700">
            <ShoppingCart size={18} />
            <span className="absolute -right-1 -top-1 rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">{items.length}</span>
          </Link>
          {user ? (
            <button onClick={signOut} className="btn-secondary hidden sm:inline-flex">{messages.navbar.logout}</button>
          ) : (
            <>
              <Link href="/login" className="btn-secondary hidden md:inline-flex">{messages.navbar.login}</Link>
              <Link href="/register" className="btn-primary hidden md:inline-flex">{messages.navbar.register}</Link>
            </>
          )}
          <Link href="/profile" className="rounded-full border border-slate-200 p-2 dark:border-slate-700"><UserCircle2 size={18} /></Link>
        </div>
      </div>
      <div className="border-t border-slate-200/70 md:hidden dark:border-slate-800">
        <div className="container-page flex gap-2 overflow-x-auto py-3 text-sm font-semibold">
          <Link href="/products" className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700">{messages.navbar.products}</Link>
          <Link href="/categories" className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700">{messages.navbar.categories}</Link>
          <Link href={user ? '/profile' : '/register'} className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700">{user ? messages.navbar.profile : messages.navbar.register}</Link>
          <Link href="/favorites" className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700">{messages.navbar.favorites}</Link>
          <Link href="/admin" className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700">{messages.navbar.admin}</Link>
        </div>
      </div>
    </header>
  );
}
