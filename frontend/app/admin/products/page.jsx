import AdminProductManager from '@/components/AdminProductManager';
import SectionHeading from '@/components/SectionHeading';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import { getCategories, getProducts } from '@/services/api';

export default async function AdminProductsPage() {
  const locale = getCurrentLocale();
  const t = getMessages(locale).adminProductsPage;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <AdminProductManager initialProducts={products} initialCategories={categories} />
    </div>
  );
}
