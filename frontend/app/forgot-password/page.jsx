'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { requestPasswordReset } from '@/services/api';

export default function ForgotPasswordPage() {
  const { messages } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset({ email });
      toast.success(messages.forgotPassword.success);
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
          <h1 className="text-3xl font-black sm:text-4xl">{messages.forgotPassword.title}</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">{messages.forgotPassword.description}</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input type="email" required placeholder={messages.forgotPassword.email} className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button disabled={loading} className="btn-primary w-full">{loading ? messages.forgotPassword.loading : messages.forgotPassword.submit}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
