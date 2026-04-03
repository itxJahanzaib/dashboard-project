import React from 'react';
import { Sun, Moon, Bell } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function TopNav() {
  const { theme, toggleTheme } = useStore();

  return (
    <header className="h-16 border-b border-[var(--border-default)] bg-[var(--bg-base)] flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center">
        {/* Placeholder for breadcrumb or search if needed later */}
        <h2 className="font-display tracking-wide text-lg text-[var(--text-secondary)]">ASH DASHBOARD</h2>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--semantic-negative)] rounded-full shadow-[0_0_8px_var(--semantic-negative)]"></span>
        </button>
      </div>
    </header>
  );
}
