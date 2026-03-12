import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function StoreShell({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="safe-area pb-12 pt-4 sm:pt-6">{children}</main>
      <Footer />
    </div>
  );
}
