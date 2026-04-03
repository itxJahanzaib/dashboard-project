import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useStore } from '../../store/useStore';

export function MainLayout({ children }) {
  const { setInitialTheme } = useStore();

  useEffect(() => {
    setInitialTheme();
  }, [setInitialTheme]);

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
