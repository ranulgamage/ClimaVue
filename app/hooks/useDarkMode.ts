/**
 * useDarkMode Hook
 * Manages dark mode state with localStorage persistence and system preference detection
 */

'use client';

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useLocalStorage<boolean>('climavue-dark-mode', false);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Check system preference on first load
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const item = window.localStorage.getItem('climavue-dark-mode');
    
    // Only set based on system preference if no preference is saved
    if (item === null) {
      setIsDark(mediaQuery.matches);
    }
  }, [setIsDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return [isDark, toggleDarkMode];
}
