import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function StoreShell({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
