'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import OrdersTable from '@/components/OrdersTable';
import SectionHeading from '@/components/SectionHeading';
import StatCard from '@/components/StatCard';
import { formatPrice } from '@/lib/commerce';
import { Package, ShieldCheck, Sparkles } from 'lucide-react';

export default function AdminDashboardShell({ t, stats }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const focusIcons = [Sparkles, Package, ShieldCheck];

  const statuses = useMemo(() => {
    const unique = new Set(stats.recentOrders.map((order) => order.status));
    return ['all', ...unique];
  }, [stats.recentOrders]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return stats.recentOrders;
    return stats.recentOrders.filter((order) => order.status === statusFilter);
  }, [stats.recentOrders, statusFilter]);

  const ordersRef = useRef(null);
  const [ordersVisible, setOrdersVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOrdersVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );
    if (ordersRef.current) {
      observer.observe(ordersRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="glass-panel glow-panel relative overflow-hidden border-white/30 bg-gradient-to-br from-white/80 via-white/60 to-white/30 shadow-soft dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-900/50">
        <div className="absolute inset-x-6 top-0 h-40 rounded-[2.5rem] bg-[radial-gradient(circle,_rgba(37,99,235,0.25),_transparent)] blur-3xl" aria-hidden />
        <div className="relative z-10 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-600 dark:text-slate-300">Live overview</p>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-white">{t.eyebrow}</span>
            </div>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label={t.totalSales} value={formatPrice(stats.totalSales)} helper={t.salesHelper} />
              <StatCard label={t.users} value={stats.totalUsers} helper={t.usersHelper} />
              <StatCard label={t.products} value={stats.totalProducts} helper={t.productsHelper} />
              <StatCard label={t.orders} value={stats.totalOrders} helper={t.ordersHelper} />
            </div>
          </div>
          <div className="admin-focus-panel rounded-[1.5rem] border border-slate-200/50 bg-white/70 p-5 dark:border-slate-700 dark:bg-slate-950/80">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t.focusTitle}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">{t.focusDescription}</p>
            <div className="mt-4 space-y-3">
              {t.focusItems.map((item, index) => {
                const Icon = focusIcons[index % focusIcons.length];
                return (
                  <div key={item.title} className="admin-focus-card">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-[color:var(--accent-color)]" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.meta}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-[color:var(--accent-color)]">{item.value}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel glow-panel border-white/30 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">{t.recentOrders}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`status-chip ${statusFilter === status ? 'status-chip-active' : ''}`}
                >
                  {t.statusFilters?.[status] || status}
                </button>
              ))}
            </div>
          </div>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-200">Updated live</span>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Orders from the last 24h are listed below with payment and delivery details.</p>
        <div
          ref={ordersRef}
          className={`mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 orders-panel ${
            ordersVisible ? 'orders-panel-visible' : ''
          }`}
        >
          <OrdersTable orders={filteredOrders} />
        </div>
      </div>
    </div>
  );
}
