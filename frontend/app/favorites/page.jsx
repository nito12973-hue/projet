'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useLanguage } from '@/context/LanguageContext';

export default function FavoritesPage() {
  const { messages } = useLanguage();
  const { user } = useAuth();
  const { favorites, loading } = useFavorites();
  const t = messages.favorites;

  return (
    <section className="section-spacing">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />
        {!user ? (
          <div className="glass-panel p-6 text-center sm:p-8">
            <h3 className="text-2xl font-black">{t.loginTitle}</h3>
            <p className="mt-3 text-slate-500">{t.loginDescription}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/login" className="btn-primary">{t.login}</Link>
              <Link href="/register" className="btn-secondary">{t.register}</Link>
            </div>
          </div>
        ) : loading ? (
          <div className="glass-panel p-6 text-center text-slate-500 sm:p-8">{t.loading}</div>
        ) : favorites.length === 0 ? (
          <div className="glass-panel p-6 text-center sm:p-8">
            <h3 className="text-2xl font-black">{t.emptyTitle}</h3>
            <p className="mt-3 text-slate-500">{t.emptyDescription}</p>
            <Link href="/products" className="btn-primary mt-5">{t.explore}</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {favorites.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </div>
    </section>
  );
}
