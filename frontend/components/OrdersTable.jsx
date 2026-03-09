export default function OrdersTable({ orders }) {
  return (
    <div className="glass-panel overflow-hidden">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
          <tr>
            <th className="px-5 py-4">Commande</th>
            <th className="px-5 py-4">Client</th>
            <th className="px-5 py-4">Montant</th>
            <th className="px-5 py-4">Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-5 py-4 font-semibold">{order._id}</td>
              <td className="px-5 py-4">{order.customer}</td>
              <td className="px-5 py-4">{order.totalPrice}€</td>
              <td className="px-5 py-4"><span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{order.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
