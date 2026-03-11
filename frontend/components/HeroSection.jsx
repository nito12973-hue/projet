'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/commerce';

export default function HeroSection() {
  const { messages } = useLanguage();

  return (
    <section className="section-spacing">
      <div className="container-page">
        <div className="glass-panel overflow-hidden bg-hero-grid p-6 sm:p-10 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{messages.hero.badge}</span>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">{messages.hero.title}</h1>
              <p className="mt-6 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">{messages.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary">{messages.hero.shop} <ArrowRight className="ml-2" size={16} /></Link>
                <Link href="/register" className="btn-secondary">{messages.hero.register}</Link>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800"><Zap className="mb-3 text-brand-500" /><p className="font-semibold">{messages.hero.fast}</p></div>
                <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800"><ShieldCheck className="mb-3 text-brand-500" /><p className="font-semibold">{messages.hero.secure}</p></div>
                <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800"><Truck className="mb-3 text-brand-500" /><p className="font-semibold">{messages.hero.delivery}</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-brand-500/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/30 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                  <p className="text-sm text-slate-300">{messages.hero.dashboard}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-400">{messages.hero.sales}</p><p className="mt-2 text-3xl font-bold">{formatPrice(12450000)}</p></div>
                    <div className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-400">{messages.hero.orders}</p><p className="mt-2 text-3xl font-bold">196</p></div>
                    <div className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-400">{messages.hero.users}</p><p className="mt-2 text-3xl font-bold">312</p></div>
                    <div className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-400">{messages.hero.zones}</p><p className="mt-2 text-3xl font-bold">14</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
