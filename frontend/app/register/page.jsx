'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { signUp, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUp(form);
  };

  return (
    <section className="section-spacing">
      <div className="container-page max-w-xl">
        <div className="glass-panel p-8">
          <h1 className="text-3xl font-black">Créer un compte</h1>
          <p className="mt-2 text-slate-500">Après vérification e-mail, le compte sera validé par l’administrateur.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input required placeholder="Nom complet" className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" required placeholder="Email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" minLength={8} required placeholder="Mot de passe" className="input-field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button disabled={loading} className="btn-primary w-full">{loading ? 'Création...' : 'Créer mon compte'}</button>
          </form>
          <p className="mt-5 text-sm text-slate-500">Déjà un compte ? <Link href="/login" className="font-semibold text-brand-500">Se connecter</Link></p>
        </div>
      </div>
    </section>
  );
}
