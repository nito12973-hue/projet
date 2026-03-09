'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, total, removeFromCart, clearCart } = useCart();

  return (
    <section className="section-spacing">
      <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-panel p-6">
          <h1 className="text-3xl font-black">Panier</h1>
          <div className="mt-6 space-y-4">
            {items.length === 0 && <p className="text-slate-500">Ton panier est vide pour le moment.</p>}
            {items.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-slate-500">Quantité: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{item.price * item.quantity}€</p>
                  <button onClick={() => removeFromCart(item._id)} className="mt-2 text-sm text-red-500">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel h-fit p-6">
          <h2 className="text-2xl font-black">Résumé</h2>
          <div className="mt-6 flex items-center justify-between"><span>Total</span><span className="text-3xl font-black">{total}€</span></div>
          <button className="btn-primary mt-6 w-full">Passer commande</button>
          <button onClick={clearCart} className="btn-secondary mt-3 w-full">Vider le panier</button>
          <Link href="/products" className="mt-3 inline-flex text-sm font-semibold text-brand-500">Continuer les achats</Link>
        </div>
      </div>
    </section>
  );
}
