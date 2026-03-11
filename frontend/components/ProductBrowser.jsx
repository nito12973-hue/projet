'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';

const PAGE_SIZE = 6;

export default function ProductBrowser({ products, categories, initialCategory = 'all' }) {
  const { messages } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setPage(1);
  }, [initialCategory]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase());
      const matchCategory = selectedCategory === 'all' || product.category?.slug === selectedCategory;
      return matchQuery && matchCategory;
    });
  }, [products, query, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="space-y-8">
      <div className="glass-panel grid gap-4 p-4 sm:p-5 lg:grid-cols-[2fr_1fr]">
        <input value={query} onChange={(e) => { setPage(1); setQuery(e.target.value); }} placeholder={messages.browser.search} className="input-field" />
        <select value={selectedCategory} onChange={(e) => { setPage(1); setSelectedCategory(e.target.value); }} className="input-field">
          <option value="all">{messages.browser.allCategories}</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.length === 0 ? (
          <div className="glass-panel p-8 text-center sm:col-span-2 xl:col-span-3">
            <h3 className="text-2xl font-black">{messages.browser.emptyTitle}</h3>
            <p className="mt-3 text-slate-500">{messages.browser.emptyDescription}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/admin/products" className="btn-primary">{messages.browser.addProduct}</Link>
              <Link href="/register" className="btn-secondary">{messages.browser.createAccount}</Link>
            </div>
          </div>
        ) : visibleProducts.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm text-slate-500">{filtered.length} {messages.browser.found}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="btn-secondary disabled:opacity-50">{messages.browser.previous}</button>
          <span className="text-sm font-semibold">{messages.browser.page} {page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="btn-secondary disabled:opacity-50">{messages.browser.next}</button>
        </div>
      </div>
    </div>
  );
}
