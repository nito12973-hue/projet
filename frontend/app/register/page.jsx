'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const { messages } = useLanguage();
  const { signUp, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUp(form);
  };

  return (
    <section className="section-spacing">
      <div className="container-page max-w-xl">
        <div className="glass-panel p-5 sm:p-8">
          <h1 className="text-3xl font-black sm:text-4xl">{messages.register.title}</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">{messages.register.description}</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input required placeholder={messages.register.name} className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" required placeholder={messages.register.email} className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" minLength={8} required placeholder={messages.register.password} className="input-field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button disabled={loading} className="btn-primary w-full">{loading ? messages.register.loading : messages.register.submit}</button>
          </form>
          <p className="mt-5 text-sm text-slate-500">{messages.register.alreadyHave} <Link href="/login" className="font-semibold text-brand-500">{messages.register.login}</Link></p>
        </div>
      </div>
    </section>
  );
}
