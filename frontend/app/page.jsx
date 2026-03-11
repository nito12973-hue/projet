import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import Link from 'next/link';
import { getProducts } from '@/services/api';

export default async function HomePage() {
  const locale = getCurrentLocale();
  const t = getMessages(locale).home;
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <HeroSection />
      <section className="section-spacing pt-0">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.description}
          />
          {featuredProducts.length === 0 ? (
            <div className="glass-panel p-8 text-center">
              <h3 className="text-2xl font-black">{t.emptyTitle}</h3>
              <p className="mt-3 text-slate-500">{t.emptyDescription}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/admin/products" className="btn-primary">{t.addProduct}</Link>
                <Link href="/products" className="btn-secondary">{t.viewCatalog}</Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {featuredProducts.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
