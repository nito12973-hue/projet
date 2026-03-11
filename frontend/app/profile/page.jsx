'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { updateProfile } from '@/services/api';

export default function ProfilePage() {
  const { messages } = useLanguage();
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const t = messages.profile;

  useEffect(() => {
    setName(user?.name || '');
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const payload = { name: name.trim() };
      if (password.trim()) payload.password = password.trim();

      await updateProfile(payload);
      await refreshUser();
      setPassword('');
      toast.success(t.updated);
    } catch (error) {
      toast.error(error.message || t.updateFailed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-spacing">
      <div className="container-page max-w-3xl">
        <div className="glass-panel p-5 sm:p-8">
          <h1 className="text-3xl font-black sm:text-4xl">{t.title}</h1>
          {user ? (
            <div className="mt-8 space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">{t.name}</p><p className="mt-2 font-bold">{user.name}</p></div>
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">{t.email}</p><p className="mt-2 font-bold break-all">{user.email}</p></div>
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">{t.role}</p><p className="mt-2 font-bold">{t.roleLabels[user.role] || user.role}</p></div>
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">{t.approval}</p><p className="mt-2 font-bold">{t.approvalLabels[user.approvalStatus] || user.approvalStatus}</p></div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 rounded-[2rem] border border-slate-200 p-5 dark:border-slate-800 sm:p-6">
                <div>
                  <h2 className="text-xl font-black">{t.editTitle}</h2>
                  <p className="mt-2 text-sm text-slate-500">{t.editDescription}</p>
                </div>
                <input
                  required
                  className="input-field"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <input
                  minLength={8}
                  type="password"
                  className="input-field"
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button disabled={submitting} className="btn-primary w-full sm:w-auto">{submitting ? t.saving : t.submit}</button>
                  <Link href="/orders" className="btn-secondary w-full justify-center sm:w-auto">{t.orders}</Link>
                  <Link href="/favorites" className="btn-secondary w-full justify-center sm:w-auto">{t.favorites}</Link>
                </div>
              </form>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500 dark:border-slate-700">{t.noSession} <Link href="/login" className="font-semibold text-brand-500">{t.login}</Link></div>
          )}
        </div>
      </div>
    </section>
  );
}
