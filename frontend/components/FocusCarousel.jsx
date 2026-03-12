'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/commerce';
import { useLanguage } from '@/context/LanguageContext';

const AUTO_PLAY_DELAY = 4000;

export default function FocusCarousel({ products }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { messages } = useLanguage();
  const { browser, focusCarousel } = messages;
  const categories = useMemo(() => {
    const set = new Set(products.map((product) => product.category?.name || 'Autres'));
    return ['all', ...Array.from(set)];
  }, [products]);
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((product) => (product.category?.name || 'Autres') === selectedCategory);
  }, [products, selectedCategory]);
  const highlighted = useMemo(() => filteredProducts.slice(0, 5), [filteredProducts]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (highlighted.length === 0) {
      return undefined;
    }
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlighted.length);
    }, AUTO_PLAY_DELAY);
    return () => clearInterval(id);
  }, [highlighted.length]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex, highlighted.length]);

  useEffect(() => {
    if (highlighted.length === 0) {
      return undefined;
    }
    const step = (100 * 60) / AUTO_PLAY_DELAY;
    const id = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        return next >= 100 ? 0 : next;
      });
    }, 60);
    return () => clearInterval(id);
  }, [highlighted.length]);

  if (!highlighted.length) {
    return null;
  }

  return (
    <section className="section-spacing">
      <div className="mb-5 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`focus-filter ${selectedCategory === category ? 'focus-filter-active' : ''}`}
          >
            {category === 'all' ? browser.allCategories : category}
          </button>
        ))}
      </div>
      <div className="focus-carousel">
        {highlighted.map((product, index) => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className={`focus-card ${index === activeIndex ? 'focus-card-active' : ''}`}
          >
            <div className="focus-card-badge">{index === activeIndex ? focusCarousel.topPick : focusCarousel.discoverBadge}</div>
            <div className="focus-card-title">{product.name}</div>
            <p className="focus-card-description">{product.description}</p>
            <div className="focus-card-meta">
              <span className="focus-card-price">{formatPrice(product.price)}</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
        <div className="focus-progress">
          {highlighted.map((_, index) => (
            <div key={index} className="focus-progress-track">
              <span
                className="focus-progress-fill"
                style={{ width: index === activeIndex ? `${progress}%` : index < activeIndex ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>
        <div className="focus-carousel-ghost" aria-hidden />
      </div>
    </section>
  );
}
