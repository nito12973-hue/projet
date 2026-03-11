'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { verifyEmail } from '@/services/api';

export default function VerifyEmailPage({ params }) {
  const { messages } = useLanguage();
  const [status, setStatus] = useState({ loading: true, message: '' });

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
        <div className="glass-panel p-5 text-center sm:p-8">
          <h1 className="text-3xl font-black sm:text-4xl">{messages.verifyEmail.title}</h1>
          <p className="mt-4 text-slate-500">{status.loading ? messages.verifyEmail.loading : status.message}</p>
          {!status.loading && <p className="mt-3 text-sm text-brand-500">{messages.verifyEmail.nextStep}</p>}
        </div>
      </div>
    </section>
  );
}
