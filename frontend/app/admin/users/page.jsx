import SectionHeading from '@/components/SectionHeading';
import UsersTable from '@/components/UsersTable';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import { getUsers } from '@/services/api';

export default async function AdminUsersPage() {
  const locale = getCurrentLocale();
  const t = getMessages(locale).adminUsersPage;
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <UsersTable users={users} />
    </div>
  );
}
