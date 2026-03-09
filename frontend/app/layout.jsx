import './globals.css';
import Providers from '@/components/providers';
import StoreShell from '@/layouts/StoreShell';

export const metadata = {
  title: 'VentePro | E-commerce moderne',
  description: 'Application e-commerce professionnelle avec Next.js, Express, MongoDB Atlas et design premium.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          <StoreShell>{children}</StoreShell>
        </Providers>
      </body>
    </html>
  );
}
