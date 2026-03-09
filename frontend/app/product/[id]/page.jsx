import Image from 'next/image';
import { Star } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import SectionHeading from '@/components/SectionHeading';
import ProductCard from '@/components/ProductCard';
import { getProductById, getProducts } from '@/services/api';

export default async function ProductDetailsPage({ params }) {
  const product = await getProductById(params.id);
  const relatedProducts = (await getProducts()).filter((item) => item._id !== product._id).slice(0, 3);

  return (
    <section className="section-spacing">
      <div className="container-page space-y-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="glass-panel p-8">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{product.category?.name}</span>
            <h1 className="mt-4 text-4xl font-black tracking-tight">{product.name}</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{product.description}</p>
            <div className="mt-6 flex items-center gap-5">
              <p className="text-4xl font-black">{product.price}€</p>
              <p className="flex items-center gap-1 text-amber-500"><Star size={18} fill="currentColor" /> {product.rating} / 5</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">Stock</p><p className="mt-2 text-2xl font-bold">{product.stock}</p></div>
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-sm text-slate-500">Avis</p><p className="mt-2 text-2xl font-bold">{product.reviewsCount || 24}</p></div>
            </div>
            <AddToCartButton product={product} className="btn-primary mt-8" />
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Produits associés" title="Complète l’expérience utilisateur" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => <ProductCard key={item._id} product={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

