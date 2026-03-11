'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
  const { messages } = useLanguage();
  const { signIn, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(form);
    } catch {
      // L'erreur est déjà gérée dans AuthContext via un toast.
    }
  };

  return (
    <section className="section-spacing">
      <div className="container-page max-w-xl">
        <div className="glass-panel p-5 sm:p-8">
          <h1 className="text-3xl font-black sm:text-4xl">{messages.login.title}</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">{messages.login.description}</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input type="email" required placeholder={messages.login.email} className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" required placeholder={messages.login.password} className="input-field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button disabled={loading} className="btn-primary w-full">{loading ? messages.login.loading : messages.login.submit}</button>
          </form>
          <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <Link href="/register" className="text-brand-500">{messages.login.register}</Link>
            <Link href="/forgot-password" className="text-brand-500">{messages.login.forgotPassword}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
