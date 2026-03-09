'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="section-spacing">
      <div className="container-page max-w-3xl">
        <div className="glass-panel p-8">
          <h1 className="text-3xl font-black">Profil utilisateur</h1>
          {user ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">Nom</p><p className="mt-2 font-bold">{user.name}</p></div>
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">Email</p><p className="mt-2 font-bold">{user.email}</p></div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500 dark:border-slate-700">Aucune session active. <Link href="/login" className="font-semibold text-brand-500">Connecte-toi</Link></div>
          )}
        </div>
      </div>
    </section>
  );
}
