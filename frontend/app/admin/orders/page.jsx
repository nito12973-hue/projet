import OrdersTable from '@/components/OrdersTable';
import SectionHeading from '@/components/SectionHeading';
import { getOrders } from '@/services/api';

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Gestion commandes" title="Suivi des commandes et des statuts" description="Le back-office permet de traiter les commandes, actualiser leur état et surveiller les ventes." />
      <OrdersTable orders={orders} />
    </div>
  );
}
