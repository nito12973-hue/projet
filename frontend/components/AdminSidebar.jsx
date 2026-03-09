import Link from 'next/link';
import { Boxes, LayoutDashboard, ShoppingBag, Users } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Produits', icon: Boxes },
  { href: '/admin/orders', label: 'Commandes', icon: ShoppingBag },
  { href: '/admin/users', label: 'Utilisateurs', icon: Users }
];

export default function AdminSidebar() {
  return (
    <aside className="glass-panel h-fit p-5">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Administration</p>
      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-brand-500 hover:text-white dark:text-slate-200">
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
