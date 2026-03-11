'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { resetPassword } from '@/services/api';

export default function ResetPasswordPage({ params }) {
  const { messages } = useLanguage();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await resetPassword(params.token, { password });
      toast.success(messages.resetPassword.success);
      setPassword('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-spacing">
      <div className="container-page max-w-xl">
        <div className="glass-panel p-5 sm:p-8">
          <h1 className="text-3xl font-black sm:text-4xl">{messages.resetPassword.title}</h1>
          <p className="mt-2 break-all text-sm text-slate-500 sm:text-base">{messages.resetPassword.secureToken} : {params.token}</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input type="password" minLength={8} required placeholder={messages.resetPassword.password} className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={loading} className="btn-primary w-full">{loading ? messages.resetPassword.loading : messages.resetPassword.submit}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
