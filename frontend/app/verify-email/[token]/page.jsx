'use client';

import { useEffect, useState } from 'react';
import { verifyEmail } from '@/services/api';

export default function VerifyEmailPage({ params }) {
  const [status, setStatus] = useState({ loading: true, message: 'Vérification en cours...' });

  useEffect(() => {
    let isMounted = true;
    verifyEmail(params.token)
      .then((data) => isMounted && setStatus({ loading: false, message: data.message }))
      .catch((error) => isMounted && setStatus({ loading: false, message: error.message }));
    return () => {
      isMounted = false;
    };
  }, [params.token]);

  return (
    <section className="section-spacing">
      <div className="container-page max-w-xl">
        <div className="glass-panel p-8 text-center">
          <h1 className="text-3xl font-black">Confirmation d’email</h1>
          <p className="mt-4 text-slate-500">{status.message}</p>
          {!status.loading && <p className="mt-3 text-sm text-brand-500">Prochaine étape : validation du compte par l’administrateur.</p>}
        </div>
      </div>
    </section>
  );
}
