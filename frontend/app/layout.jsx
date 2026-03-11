import './globals.css';
import Providers from '@/components/providers';
import { getMessages } from '@/lib/i18n';
import { getCurrentLocale } from '@/lib/server-locale';
import StoreShell from '@/layouts/StoreShell';

export function generateMetadata() {
  const locale = getCurrentLocale();
  return getMessages(locale).metadata;
}

export default function RootLayout({ children }) {
  const locale = getCurrentLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers initialLocale={locale}>
          <StoreShell>{children}</StoreShell>
        </Providers>
      </body>
    </html>
  );
}
