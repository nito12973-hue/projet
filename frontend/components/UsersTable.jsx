export default function UsersTable({ users }) {
  return (
    <div className="glass-panel overflow-hidden">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
          <tr>
            <th className="px-5 py-4">Nom</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Statut</th>
            <th className="px-5 py-4">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-5 py-4 font-semibold">{user.name}</td>
              <td className="px-5 py-4">{user.email}</td>
              <td className="px-5 py-4">{user.approvalStatus}</td>
              <td className="px-5 py-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
