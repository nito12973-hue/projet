'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { resetPassword } from '@/services/api';

export default function ResetPasswordPage({ params }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await resetPassword(params.token, { password });
      toast.success(data.message || 'Mot de passe mis à jour.');
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
        <div className="glass-panel p-8">
          <h1 className="text-3xl font-black">Réinitialiser le mot de passe</h1>
          <p className="mt-2 text-slate-500">Token sécurisé : {params.token}</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input type="password" minLength={8} required placeholder="Nouveau mot de passe" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={loading} className="btn-primary w-full">{loading ? 'Mise à jour...' : 'Mettre à jour'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
