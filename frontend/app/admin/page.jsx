import OrdersTable from '@/components/OrdersTable';
import SectionHeading from '@/components/SectionHeading';
import StatCard from '@/components/StatCard';
import { formatPrice } from '@/lib/commerce';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import { getDashboardStats } from '@/services/api';

export default async function AdminDashboardPage() {
  const locale = getCurrentLocale();
  const t = getMessages(locale).adminDashboard;
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t.totalSales} value={formatPrice(stats.totalSales)} helper={t.salesHelper} />
        <StatCard label={t.users} value={stats.totalUsers} helper={t.usersHelper} />
        <StatCard label={t.products} value={stats.totalProducts} helper={t.productsHelper} />
        <StatCard label={t.orders} value={stats.totalOrders} helper={t.ordersHelper} />
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-black">{t.recentOrders}</h3>
        <OrdersTable orders={stats.recentOrders} />
      </div>
    </div>
  );
}
