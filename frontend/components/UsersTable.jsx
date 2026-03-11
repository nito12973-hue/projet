'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { reviewUser } from '@/services/api';

const STATUSES = ['approved', 'pending', 'rejected'];

export default function UsersTable({ users: initialUsers }) {
  const { messages } = useLanguage();
  const [users, setUsers] = useState(initialUsers);
  const [busyAction, setBusyAction] = useState('');
  const t = messages.usersTable;

  const handleReview = async (userId, approvalStatus) => {
    setBusyAction(`${userId}:${approvalStatus}`);
    try {
      const data = await reviewUser(userId, approvalStatus);
      setUsers((current) => current.map((user) => (user._id === userId ? { ...user, approvalStatus: data.user.approvalStatus } : user)));
      toast.success(t.updated);
    } catch (error) {
      toast.error(error.message || t.updateFailed);
    } finally {
      setBusyAction('');
    }
  };

  return (
    <div className="glass-panel overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
          <tr>
            <th className="whitespace-nowrap px-5 py-4">{t.name}</th>
            <th className="whitespace-nowrap px-5 py-4">{t.email}</th>
            <th className="whitespace-nowrap px-5 py-4">{t.status}</th>
            <th className="whitespace-nowrap px-5 py-4">{t.role}</th>
            <th className="whitespace-nowrap px-5 py-4">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                {t.empty}
              </td>
            </tr>
          ) : null}
          {users.map((user) => (
            <tr key={user._id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-5 py-4 font-semibold whitespace-nowrap">{user.name}</td>
              <td className="px-5 py-4">{user.email}</td>
              <td className="px-5 py-4 whitespace-nowrap">{t.statusLabels[user.approvalStatus] || user.approvalStatus}</td>
              <td className="px-5 py-4 whitespace-nowrap">{t.roleLabels[user.role] || user.role}</td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={user.role === 'admin' || busyAction === `${user._id}:${status}`}
                      onClick={() => handleReview(user._id, status)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold disabled:opacity-50 dark:border-slate-700"
                    >
                      {busyAction === `${user._id}:${status}` ? t.loading : t.statusLabels[status] || status}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
