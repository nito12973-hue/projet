import OrdersTable from '@/components/OrdersTable';
import SectionHeading from '@/components/SectionHeading';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import { getOrders } from '@/services/api';

export default async function AdminOrdersPage() {
  const locale = getCurrentLocale();
  const t = getMessages(locale).adminOrdersPage;
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <OrdersTable orders={orders} />
    </div>
  );
}
