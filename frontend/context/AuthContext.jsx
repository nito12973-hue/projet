'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { loginUser, logoutUser, registerUser } from '@/services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (payload) => {
    setLoading(true);
    try {
      const data = await loginUser(payload);
      setUser(data.user || null);
      toast.success('Connexion réussie.');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (payload) => {
    setLoading(true);
    try {
      const data = await registerUser(payload);
      toast.success(data.message || 'Compte créé. Vérifie ton e-mail.');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await logoutUser();
    } catch {
      // Le nettoyage local reste prioritaire même si l'API n'est pas joignable.
    } finally {
      setUser(null);
      toast.success('Déconnexion effectuée.');
    }
  };

  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider.');
  return context;
}
