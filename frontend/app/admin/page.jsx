import OrdersTable from '@/components/OrdersTable';
import SectionHeading from '@/components/SectionHeading';
import StatCard from '@/components/StatCard';
import { getDashboardStats } from '@/services/api';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Dashboard admin" title="Pilotage global de la boutique" description="Vue synthétique sur les produits, utilisateurs, ventes et commandes récentes." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Ventes totales" value={`${stats.totalSales}€`} helper="Progression mensuelle +18%" />
        <StatCard label="Utilisateurs" value={stats.totalUsers} helper="Comptes actifs et validés" />
        <StatCard label="Produits" value={stats.totalProducts} helper="Catalogue disponible" />
        <StatCard label="Commandes" value={stats.totalOrders} helper="Suivi en temps réel" />
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-black">Commandes récentes</h3>
        <OrdersTable orders={stats.recentOrders} />
      </div>
    </div>
  );
}
