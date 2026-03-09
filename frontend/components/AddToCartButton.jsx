'use client';

import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product, className = 'btn-primary' }) {
  const { addToCart } = useCart();

  return (
    <button type="button" onClick={() => addToCart(product)} className={className}>
      Ajouter au panier
    </button>
  );
}
