'use client';

import { formatPrice } from '@/lib/commerce';
import { useLanguage } from '@/context/LanguageContext';
import { getDateLocale } from '@/lib/i18n';

export default function OrdersTable({ orders }) {
  const { locale, messages } = useLanguage();

  return (
    <div className="glass-panel overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
          <tr>
            <th className="px-5 py-4 whitespace-nowrap">{messages.ordersTable.order}</th>
            <th className="px-5 py-4 whitespace-nowrap">{messages.ordersTable.customerDelivery}</th>
            <th className="px-5 py-4 whitespace-nowrap">{messages.ordersTable.amount}</th>
            <th className="px-5 py-4 whitespace-nowrap">{messages.ordersTable.payment}</th>
            <th className="px-5 py-4 whitespace-nowrap">{messages.ordersTable.status}</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                {messages.ordersTable.empty}
              </td>
            </tr>
          ) : null}
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-5 py-4 align-top">
                <p className="font-semibold">{order._id}</p>
                <p className="mt-1 text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString(getDateLocale(locale))}</p>
              </td>
              <td className="px-5 py-4 align-top">
                <p className="font-medium">{order.customer || messages.ordersTable.customer}</p>
                <p className="mt-1 text-xs text-slate-500">{order.deliveryCity || messages.ordersTable.unspecifiedCity}</p>
                {order.phone ? <p className="text-xs text-slate-500">{order.phone}</p> : null}
              </td>
              <td className="px-5 py-4 align-top whitespace-nowrap">{formatPrice(order.totalPrice)}</td>
              <td className="px-5 py-4 align-top">
                <p>{messages.ordersTable.paymentLabels[order.paymentMethod] || messages.ordersTable.unspecified}</p>
                {order.items?.length ? <p className="mt-1 text-xs text-slate-500">{order.items.length} {messages.ordersTable.items}</p> : null}
              </td>
              <td className="px-5 py-4 align-top"><span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{messages.ordersTable.statusLabels[order.status] || order.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
