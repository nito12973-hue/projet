'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getFavorites, toggleFavorite as toggleFavoriteRequest } from '@/services/api';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const { messages } = useLanguage();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!user) {
      setFavorites([]);
      return () => {
        mounted = false;
      };
    }

    setLoading(true);
    getFavorites()
      .then((items) => {
        if (mounted) setFavorites(items);
      })
      .catch(() => {
        if (mounted) setFavorites([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [user]);

  const favoriteIds = useMemo(() => favorites.map((product) => product._id), [favorites]);

  const toggleFavorite = async (product) => {
    if (!user) {
      toast.error(messages.favoritesContext.loginRequired);
      return false;
    }

    const wasFavorite = favoriteIds.includes(product._id);

    try {
      await toggleFavoriteRequest(product._id);
      setFavorites((current) => {
        if (wasFavorite) return current.filter((item) => item._id !== product._id);
        return [product, ...current.filter((item) => item._id !== product._id)];
      });
      toast.success(wasFavorite ? messages.favoritesContext.removed : messages.favoritesContext.added);
      return true;
    } catch (error) {
      toast.error(error.message || messages.favoritesContext.failed);
      return false;
    }
  };

  const value = useMemo(() => ({ favorites, favoriteIds, loading, toggleFavorite }), [favorites, favoriteIds, loading]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites doit être utilisé dans FavoritesProvider.');
  return context;
}