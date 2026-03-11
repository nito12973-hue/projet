'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/commerce';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/services/api';

const DELIVERY_CITIES = ['Dakar', 'Thiès', 'Saint-Louis', 'Mbour', 'Kaolack', 'Ziguinchor'];
const PAYMENT_METHODS = [
  { value: 'cash_on_delivery', label: 'Paiement à la livraison' },
  { value: 'wave', label: 'Wave' },
  { value: 'orange_money', label: 'Orange Money' },
  { value: 'free_money', label: 'Free Money' }
];

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { messages } = useLanguage();
  const { items, total, removeFromCart, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    phone: '',
    deliveryCity: 'Dakar',
    deliveryAddress: '',
    paymentMethod: 'cash_on_delivery'
  });

  const updateField = (field, value) => setCheckoutForm((current) => ({ ...current, [field]: value }));
  const paymentMethods = PAYMENT_METHODS.map((method) => ({
    value: method.value,
    label: messages.ordersTable.paymentLabels[method.value] || method.label
  }));

  const handleCheckout = async () => {
    if (!user) {
      toast.error(messages.cart.loginBefore);
      router.push('/login');
      return;
    }

    if (!items.length) {
      toast.error(messages.cart.cartEmpty);
      return;
    }

    if (!checkoutForm.phone.trim() || !checkoutForm.deliveryAddress.trim()) {
      toast.error(messages.cart.missingInfo);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        products: items.map((item) => ({ product: item._id, quantity: item.quantity })),
        phone: checkoutForm.phone.trim(),
        deliveryCity: checkoutForm.deliveryCity,
        deliveryAddress: checkoutForm.deliveryAddress.trim(),
        paymentMethod: checkoutForm.paymentMethod
      };
      const data = await createOrder(payload);
      clearCart();
      toast.success(data.message || messages.cart.created);
      router.push('/orders');
    } catch (error) {
      toast.error(error.message || messages.cart.failed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-spacing">
      <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-panel p-6">
          <h1 className="text-3xl font-black">{messages.cart.title}</h1>
          <div className="mt-6 space-y-4">
            {items.length === 0 && <p className="text-slate-500">{messages.cart.empty}</p>}
            {items.map((item) => (
              <div key={item._id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-slate-500">{messages.cart.quantity}: {item.quantity}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                  <button onClick={() => removeFromCart(item._id)} className="mt-2 text-sm text-red-500">{messages.cart.remove}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel h-fit p-6">
          <h2 className="text-2xl font-black">{messages.cart.summary}</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">{messages.cart.phone}</label>
              <input
                value={checkoutForm.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                className="input-field"
                placeholder={messages.cart.phonePlaceholder}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">{messages.cart.city}</label>
              <select
                value={checkoutForm.deliveryCity}
                onChange={(event) => updateField('deliveryCity', event.target.value)}
                className="input-field"
              >
                {DELIVERY_CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">{messages.cart.address}</label>
              <textarea
                rows={3}
                value={checkoutForm.deliveryAddress}
                onChange={(event) => updateField('deliveryAddress', event.target.value)}
                className="input-field"
                placeholder={messages.cart.addressPlaceholder}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">{messages.cart.payment}</label>
              <select
                value={checkoutForm.paymentMethod}
                onChange={(event) => updateField('paymentMethod', event.target.value)}
                className="input-field"
              >
                {paymentMethods.map((method) => <option key={method.value} value={method.value}>{method.label}</option>)}
              </select>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-xs text-slate-500 dark:border-slate-700">
              {messages.cart.note}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4"><span>{messages.cart.total}</span><span className="text-3xl font-black">{formatPrice(total)}</span></div>
          <button disabled={submitting || items.length === 0} onClick={handleCheckout} className="btn-primary mt-6 w-full disabled:opacity-50">{submitting ? messages.cart.validating : messages.cart.checkout}</button>
          <button onClick={clearCart} className="btn-secondary mt-3 w-full">{messages.cart.clear}</button>
          <Link href="/products" className="mt-3 inline-flex text-sm font-semibold text-brand-500">{messages.cart.continue}</Link>
        </div>
      </div>
    </section>
  );
}
