import OrdersTable from '@/components/OrdersTable';
import SectionHeading from '@/components/SectionHeading';
import { getMyOrders } from '@/services/api';

export default async function OrdersPage() {
  const orders = await getMyOrders();

  return (
    <section className="section-spacing">
      <div className="container-page">
        <SectionHeading
          eyebrow="Historique"
          title="Tes commandes passées"
          description="Le backend relie chaque commande à l’utilisateur authentifié et conserve les statuts de traitement."
        />
        <OrdersTable orders={orders} />
      </div>
    </section>
  );
}
