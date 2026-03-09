import SectionHeading from '@/components/SectionHeading';
import UsersTable from '@/components/UsersTable';
import { getUsers } from '@/services/api';

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Validation utilisateurs" title="Accepter ou refuser les comptes après confirmation email" description="Le flux de sécurité impose une vérification email puis une validation admin avant la connexion." />
      <UsersTable users={users} />
    </div>
  );
}
