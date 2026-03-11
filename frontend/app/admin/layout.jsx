import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }) {
  return (
    <section className="section-spacing">
      <div className="container-page grid items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
        <AdminSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
