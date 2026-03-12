'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/commerce';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

export default function ProductCard({ product }) {
  const { messages } = useLanguage();
  const { addToCart } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(product._id);

  return (
    <article className="card-hover overflow-hidden rounded-[2rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          aria-pressed={isFavorite}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-800 shadow-md transition hover:scale-105 dark:bg-slate-900/90 dark:text-white"
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} className={isFavorite ? 'text-red-500' : ''} />
        </button>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{product.category?.name || messages.card.collection}</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-[color:var(--accent-color)]"><Star size={15} fill="currentColor" /> {product.rating}</span>
        </div>
        <div>
          <Link href={`/product/${product._id}`} className="text-lg font-bold text-slate-900 hover:text-brand-500 dark:text-white">{product.name}</Link>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{product.description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{formatPrice(product.price)}</p>
            <p className="text-xs text-slate-500">{messages.card.stock}: {product.stock}</p>
          </div>
          <button onClick={() => addToCart(product)} className="btn-primary w-full sm:w-auto">{messages.card.add}</button>
        </div>
      </div>
    </article>
  );
}
