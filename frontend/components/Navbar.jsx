'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, UserCircle2 } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Vente<span className="text-brand-500">Pro</span></Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300">Produits</Link>
          <Link href="/favorites" className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300">Favoris</Link>
          <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300">Admin</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/favorites" className="rounded-full border border-slate-200 p-2 dark:border-slate-700"><Heart size={18} /></Link>
          <Link href="/cart" className="relative rounded-full border border-slate-200 p-2 dark:border-slate-700">
            <ShoppingCart size={18} />
            <span className="absolute -right-1 -top-1 rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">{items.length}</span>
          </Link>
          {user ? (
            <button onClick={signOut} className="btn-secondary hidden sm:inline-flex">Déconnexion</button>
          ) : (
            <Link href="/login" className="btn-secondary hidden sm:inline-flex">Connexion</Link>
          )}
          <Link href="/profile" className="rounded-full border border-slate-200 p-2 dark:border-slate-700"><UserCircle2 size={18} /></Link>
        </div>
      </div>
    </header>
  );
}
