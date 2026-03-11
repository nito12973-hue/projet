import OrdersTable from '@/components/OrdersTable';
import SectionHeading from '@/components/SectionHeading';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import { getMyOrders } from '@/services/api';

export default async function OrdersPage() {
  const locale = getCurrentLocale();
  const t = getMessages(locale).ordersPage;
  const orders = await getMyOrders();

  return (
    <section className="section-spacing">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />
        <OrdersTable orders={orders} />
      </div>
    </section>
  );
}
