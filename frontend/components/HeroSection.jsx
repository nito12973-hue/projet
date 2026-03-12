'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import { useDesignSettings } from '@/context/DesignContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/commerce';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const { messages } = useLanguage();
  const { accentConfig } = useDesignSettings();
  const heroRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  const floatingBadges = [
    { text: messages.hero.fast, style: { top: '12%', left: '6%' } },
    { text: messages.hero.delivery, style: { bottom: '12%', right: '10%' } },
    { text: messages.hero.secure, style: { bottom: '18%', left: '16%' } }
  ];

  useEffect(() => {
    const handlePointer = (event) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setPointer({
        x: Math.round(((event.clientX - rect.left) / rect.width) * 100),
        y: Math.round(((event.clientY - rect.top) / rect.height) * 100)
      });
    };
    const node = heroRef.current;
    node?.addEventListener('pointermove', handlePointer);
    return () => node?.removeEventListener('pointermove', handlePointer);
  }, []);

  const stats = [
    { label: messages.hero.sales, value: formatPrice(12450000) },
    { label: messages.hero.orders, value: '196' },
    { label: messages.hero.users, value: '312' },
    { label: messages.hero.zones, value: '14' }
  ];
  const perks = [
    { label: messages.hero.fast, Icon: Zap },
    { label: messages.hero.secure, Icon: ShieldCheck },
    { label: messages.hero.delivery, Icon: Truck }
  ];

  return (
    <section className="section-spacing">
      <div className="container-page">
        <div className="glass-panel overflow-hidden bg-hero-grid p-6 sm:p-10 lg:p-16">
        <div
          className="hero-panel relative overflow-hidden rounded-[3rem] border border-white/30 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950/85"
          ref={heroRef}
          style={{
            '--hero-pointer-x': `${pointer.x}%`,
            '--hero-pointer-y': `${pointer.y}%`
          }}
        >
          <div className="hero-ambient" style={{ backgroundImage: accentConfig.gradient }} aria-hidden />
          <div className="hero-shimmer" aria-hidden />
          <div className="hero-floating-group" aria-hidden>
            {floatingBadges.map((badge) => (
              <span key={badge.text} className="hero-floating-badge" style={badge.style}>
                {badge.text}
              </span>
            ))}
          </div>
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <span className="hero-label">{messages.hero.badge}</span>
                <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
                  {messages.hero.title}
                </h1>
                <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                  {messages.hero.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Link href="/products" className="btn-primary">
                    {messages.hero.shop} <ArrowRight className="ml-2" size={16} />
                  </Link>
                  <Link href="/register" className="btn-secondary">
                    {messages.hero.register}
                  </Link>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {perks.map(({ label, Icon }) => (
                    <div key={label} className="hero-pill">
                      <Icon className="hero-pill-icon" />
                      <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="hero-dashboard-outline" />
                <div className="hero-dashboard relative rounded-[2rem] border border-white/30 bg-slate-950 p-6 text-white shadow-soft">
                  <p className="text-sm text-slate-300">{messages.hero.dashboard}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {stats.map((stat) => (
                      <div key={stat.label} className="hero-stat">
                        <p className="text-sm text-slate-400">{stat.label}</p>
                        <p className="hero-stat-value">{stat.value}</p>
                      </div>
                    ))}
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
