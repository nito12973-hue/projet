import ProductBrowser from '@/components/ProductBrowser';
import SectionHeading from '@/components/SectionHeading';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import { getCategories, getProducts } from '@/services/api';

export default async function ProductsPage({ searchParams }) {
  const locale = getCurrentLocale();
  const t = getMessages(locale).productsPage;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const category = typeof searchParams?.category === 'string' ? searchParams.category : 'all';

  return (
    <section className="section-spacing">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />
        <ProductBrowser products={products} categories={categories} initialCategory={category} />
      </div>
    </section>
  );
}
