'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '@/services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { messages } = useLanguage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCurrentUser().then((currentUser) => {
      if (mounted) setUser(currentUser);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const refreshUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    return currentUser;
  };

  const signIn = async (payload) => {
    setLoading(true);
    try {
      const data = await loginUser(payload);
      setUser(data.user || null);
      toast.success(messages.auth.loginSuccess);
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
      toast.success(messages.auth.signupSuccess);
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
      toast.success(messages.auth.logoutSuccess);
    }
  };

  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut, refreshUser }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider.');
  return context;
}
