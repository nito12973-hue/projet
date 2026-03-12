'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const ACCENT_PRESETS = {
  ocean: {
    label: 'Océan',
    primary: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 60%)',
    glow: 'rgba(37, 99, 235, 0.35)'
  },
  ember: {
    label: 'Embers',
    primary: '#f97316',
    gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 65%)',
    glow: 'rgba(249, 115, 22, 0.35)'
  },
  forest: {
    label: 'Forêt',
    primary: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 70%)',
    glow: 'rgba(34, 197, 94, 0.35)'
  }
};

export const PATTERN_PRESETS = {
  grid: {
    label: 'Quadrillage',
    pattern: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1), transparent 45%), radial-gradient(circle at 80% 0, rgba(15, 23, 42, 0.18), transparent 35%)',
    opacity: '0.65'
  },
  waves: {
    label: 'Vagues',
    pattern: 'linear-gradient(120deg, rgba(255, 255, 255, 0.08) 20%, transparent 20%), linear-gradient(60deg, rgba(255, 255, 255, 0.08) 20%, transparent 20%)',
    opacity: '0.8'
  },
  aurora: {
    label: 'Aurore',
    pattern: 'radial-gradient(circle at 30% 0, rgba(59, 130, 246, 0.15), transparent 40%), radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.12), transparent 60%)',
    opacity: '0.7'
  }
};

const STORAGE_KEY = 'sununarket-design';

const DesignContext = createContext(null);

export function DesignProvider({ children }) {
  const [accent, setAccent] = useState(() => {
    if (typeof window === 'undefined') return 'ocean';
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      return saved?.accent in ACCENT_PRESETS ? saved.accent : 'ocean';
    } catch {
      return 'ocean';
    }
  });
  const [pattern, setPattern] = useState(() => {
    if (typeof window === 'undefined') return 'grid';
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      return saved?.pattern in PATTERN_PRESETS ? saved.pattern : 'grid';
    } catch {
      return 'grid';
    }
  });

  const accentConfig = useMemo(() => ACCENT_PRESETS[accent], [accent]);
  const patternConfig = useMemo(() => PATTERN_PRESETS[pattern], [pattern]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty('--accent-color', accentConfig.primary);
    document.documentElement.style.setProperty('--accent-gradient', accentConfig.gradient);
    document.documentElement.style.setProperty('--accent-glow', accentConfig.glow);
  }, [accentConfig]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty('--bg-pattern', patternConfig.pattern);
    document.documentElement.style.setProperty('--bg-pattern-opacity', patternConfig.opacity);
  }, [patternConfig]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ accent, pattern }));
  }, [accent, pattern]);

  return (
    <DesignContext.Provider value={{ accent, setAccent, pattern, setPattern, accentConfig, patternConfig }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesignSettings() {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesignSettings must be used within a DesignProvider');
  }
  return context;
}
