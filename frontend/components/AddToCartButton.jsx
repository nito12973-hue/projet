'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product, className = 'btn-primary' }) {
  const { addToCart } = useCart();
  const { messages } = useLanguage();

  return (
    <button type="button" onClick={() => addToCart(product)} className={className}>
      {messages.card.add}
    </button>
  );
}
