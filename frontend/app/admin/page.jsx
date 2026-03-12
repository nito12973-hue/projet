import AdminDashboardShell from '@/components/AdminDashboardShell';
import { getDashboardStats } from '@/services/api';
import { getCurrentLocale } from '@/lib/server-locale';
import { getMessages } from '@/lib/i18n';

export default async function AdminDashboardPage() {
  const locale = getCurrentLocale();
  const t = getMessages(locale).adminDashboard;
  const stats = await getDashboardStats();

  return <AdminDashboardShell t={t} stats={stats} />;
}
