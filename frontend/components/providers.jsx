'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';

export default function Providers({ children, initialLocale }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider initialLocale={initialLocale}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <FavoritesProvider>
              <CartProvider>
                {children}
                <Toaster richColors position="top-right" />
              </CartProvider>
            </FavoritesProvider>
          </AuthProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
