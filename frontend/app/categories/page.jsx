import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import { getCategories, getProducts } from '@/services/api';

export default async function CategoriesPage() {
  const locale = getCurrentLocale();
  const t = getMessages(locale).categoriesPage;
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const counts = products.reduce((accumulator, product) => {
    const slug = product.category?.slug;
    if (slug) accumulator[slug] = (accumulator[slug] || 0) + 1;
    return accumulator;
  }, {});

  return (
    <section className="section-spacing">
      <div className="container-page space-y-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
        {categories.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <h3 className="text-2xl font-black">{t.emptyTitle}</h3>
            <p className="mt-3 text-slate-500">{t.emptyDescription}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/admin/products" className="btn-primary">{t.createCategory}</Link>
              <Link href="/products" className="btn-secondary">{t.viewCatalog}</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.slug} href={`/products?category=${category.slug}`} className="glass-panel block p-6 transition hover:-translate-y-1 hover:border-brand-500/40">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">{t.label}</p>
                <h3 className="mt-4 text-2xl font-black">{category.name}</h3>
                <p className="mt-3 text-slate-500">{counts[category.slug] || 0} {t.available}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-brand-500">{t.viewProducts}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}