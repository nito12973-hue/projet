'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { requestPasswordReset } from '@/services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await requestPasswordReset({ email });
      toast.success(data.message || 'Email de réinitialisation envoyé.');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-spacing">
      <div className="container-page max-w-xl">
        <div className="glass-panel p-8">
          <h1 className="text-3xl font-black">Mot de passe oublié</h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input type="email" required placeholder="Ton email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button disabled={loading} className="btn-primary w-full">{loading ? 'Envoi...' : 'Envoyer le lien'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
