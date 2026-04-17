import React from 'react';
import { Sun, Moon, Bell } from 'lucide-react';
import { useStore } from '../../store/useStore';

import { motion, AnimatePresence } from 'framer-motion';

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
          className="p-2 rounded-md hover:bg-[var(--bg-surface)] text-[var(--accent-primary)] transition-colors relative overflow-hidden w-10 h-10 flex items-center justify-center border border-[var(--border-default)] shadow-sm bg-[var(--bg-elevated)]"
          title="Toggle Theme"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: -30, opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: 30, opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
            >
              {theme === 'dark' ? <Moon size={20} fill="currentColor" /> : <Sun size={20} fill="currentColor" />}
            </motion.div>
          </AnimatePresence>
        </button>
        <button className="p-2 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors relative border border-transparent hover:border-[var(--border-default)]">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--semantic-negative)] rounded-full shadow-[0_0_8px_var(--semantic-negative)]"></span>
        </button>
      </div>
    </header>
  );
}
