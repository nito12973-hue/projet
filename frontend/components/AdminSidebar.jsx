'use client';

import Link from 'next/link';
import { Boxes, LayoutDashboard, ShoppingBag, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminSidebar() {
  const { messages } = useLanguage();
  const t = messages.adminSidebar;
  const links = [
    { href: '/admin', label: t.dashboard, icon: LayoutDashboard },
    { href: '/admin/products', label: t.products, icon: Boxes },
    { href: '/admin/orders', label: t.orders, icon: ShoppingBag },
    { href: '/admin/users', label: t.users, icon: Users }
  ];

  return (
    <aside className="glass-panel h-fit p-4 sm:p-5">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">{t.title}</p>
      <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center justify-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-brand-500 hover:text-white dark:text-slate-200 sm:justify-start">
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
