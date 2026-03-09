'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';

const PAGE_SIZE = 6;

export default function ProductBrowser({ products, categories }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase());
      const matchCategory = selectedCategory === 'all' || product.category?.slug === selectedCategory;
      return matchQuery && matchCategory;
    });
  }, [products, query, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-8">
      <div className="glass-panel grid gap-4 p-5 lg:grid-cols-[2fr_1fr]">
        <input value={query} onChange={(e) => { setPage(1); setQuery(e.target.value); }} placeholder="Rechercher un produit..." className="input-field" />
        <select value={selectedCategory} onChange={(e) => { setPage(1); setSelectedCategory(e.target.value); }} className="input-field">
          <option value="all">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
      <div className="flex items-center justify-between rounded-3xl border border-slate-200 px-5 py-4 dark:border-slate-800">
        <p className="text-sm text-slate-500">{filtered.length} produit(s) trouvé(s)</p>
        <div className="flex items-center gap-3">
          <button disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="btn-secondary px-4 py-2 text-sm disabled:opacity-50">Précédent</button>
          <span className="text-sm font-semibold">Page {page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="btn-secondary px-4 py-2 text-sm disabled:opacity-50">Suivant</button>
        </div>
      </div>
    </div>
  );
}
