'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeToggleProps = {
  tabIndex?: number;
};

export default function ThemeToggle({ tabIndex = 0 }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="theme-toggle-placeholder" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      tabIndex={tabIndex}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span
        className="theme-toggle-icon"
        key={isDark ? 'sun' : 'moon'}
        aria-hidden="true"
      >
        {isDark ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
      </span>
    </button>
  );
}
