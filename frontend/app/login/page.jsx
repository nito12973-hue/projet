'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { signIn, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signIn(form);
  };

  return (
    <section className="section-spacing">
      <div className="container-page max-w-xl">
        <div className="glass-panel p-8">
          <h1 className="text-3xl font-black">Connexion</h1>
          <p className="mt-2 text-slate-500">Connecte-toi après validation admin de ton compte.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input type="email" required placeholder="Email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" required placeholder="Mot de passe" className="input-field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button disabled={loading} className="btn-primary w-full">{loading ? 'Connexion...' : 'Se connecter'}</button>
          </form>
          <div className="mt-5 flex items-center justify-between text-sm">
            <Link href="/register" className="text-brand-500">Créer un compte</Link>
            <Link href="/forgot-password" className="text-brand-500">Mot de passe oublié</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
