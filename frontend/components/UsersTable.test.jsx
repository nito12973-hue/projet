'use client';

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import UsersTable from '@/components/UsersTable';
import { LanguageProvider } from '@/context/LanguageContext';
import { COOKIE_NAME } from '@/lib/i18n';

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
  reviewUser: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn()
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mocks.refresh })
}));

vi.mock('@/services/api', () => ({
  reviewUser: (...args) => mocks.reviewUser(...args)
}));

vi.mock('sonner', () => ({
  toast: {
    success: (...args) => mocks.toastSuccess(...args),
    error: (...args) => mocks.toastError(...args)
  }
}));

function renderTable(users, locale = 'fr') {
  window.localStorage.setItem(COOKIE_NAME, locale);

  return render(
    <LanguageProvider initialLocale={locale}>
      <UsersTable users={users} />
    </LanguageProvider>
  );
}

describe('UsersTable', () => {
  beforeEach(() => {
    mocks.refresh.mockClear();
    mocks.reviewUser.mockReset();
    mocks.toastSuccess.mockClear();
    mocks.toastError.mockClear();
  });

  it('renders the english empty state', () => {
    renderTable([], 'en');

    expect(screen.getByText('No users to display.')).toBeInTheDocument();
  });

  it('renders translated values and updates a user approval status', async () => {
    const user = userEvent.setup();
    mocks.reviewUser.mockResolvedValue({
      user: { approvalStatus: 'approved' }
    });

    renderTable([
      { _id: 'u1', name: 'Mariama', email: 'mariama@example.com', approvalStatus: 'pending', role: 'customer' },
      { _id: 'u2', name: 'Root Admin', email: 'admin@example.com', approvalStatus: 'approved', role: 'admin' }
    ], 'en');

    const mariamaRow = screen.getByText('Mariama').closest('tr');
    const adminRow = screen.getByText('Root Admin').closest('tr');

    expect(mariamaRow).not.toBeNull();
    expect(adminRow).not.toBeNull();

    const mariamaCells = within(mariamaRow).getAllByRole('cell');
    const adminCells = within(adminRow).getAllByRole('cell');

    expect(mariamaCells[2]).toHaveTextContent('Pending');
    expect(mariamaCells[3]).toHaveTextContent('Customer');
    expect(adminCells[3]).toHaveTextContent('Administrator');

    const approveButton = within(mariamaRow).getByRole('button', { name: 'Approved' });
    const adminApproveButton = within(adminRow).getByRole('button', { name: 'Approved' });
    expect(adminApproveButton).toBeDisabled();

    await user.click(approveButton);

    await waitFor(() => {
      expect(mocks.reviewUser).toHaveBeenCalledWith('u1', 'approved');
    });

    expect(mocks.toastSuccess).toHaveBeenCalledWith('User status updated.');
    expect(mariamaCells[2]).toHaveTextContent('Approved');
  });
});