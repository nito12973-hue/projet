import Image from 'next/image';
import { Star } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import ProductReviews from '@/components/ProductReviews';
import SectionHeading from '@/components/SectionHeading';
import ProductCard from '@/components/ProductCard';
import { formatPrice } from '@/lib/commerce';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import { getProductDetails, getProducts } from '@/services/api';

export default async function ProductDetailsPage({ params }) {
  const locale = getCurrentLocale();
  const t = getMessages(locale).productPage;
  const { product, reviews } = await getProductDetails(params.id);
  const relatedProducts = (await getProducts()).filter((item) => item._id !== product._id).slice(0, 3);

  return (
    <section className="section-spacing">
      <div className="container-page space-y-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="glass-panel p-6 sm:p-8">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{product.category?.name}</span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{product.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <p className="text-3xl font-black sm:text-4xl">{formatPrice(product.price)}</p>
              <p className="flex items-center gap-1 text-amber-500"><Star size={18} fill="currentColor" /> {product.rating} / 5</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">{t.stock}</p><p className="mt-2 text-2xl font-bold">{product.stock}</p></div>
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">{t.reviews}</p><p className="mt-2 text-2xl font-bold">{product.reviewsCount || 24}</p></div>
            </div>
            <AddToCartButton product={product} className="btn-primary mt-8" />
          </div>
        </div>
        <div>
          <SectionHeading eyebrow={t.reviewEyebrow} title={t.reviewTitle} description={t.reviewDescription} />
          <ProductReviews productId={product._id} initialReviews={reviews} />
        </div>
        <div>
          <SectionHeading eyebrow={t.relatedEyebrow} title={t.relatedTitle} />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => <ProductCard key={item._id} product={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

