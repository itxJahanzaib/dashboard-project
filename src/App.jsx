import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { AnimatePresence } from 'framer-motion';

import { useStore } from './store/useStore';
import Login from './pages/Login';

const Overview = lazy(() => import('./pages/Overview'));
const DatUsers = lazy(() => import('./pages/DatUsers'));
const Dialers = lazy(() => import('./pages/Dialers'));
const SystemSummary = lazy(() => import('./pages/SystemSummary'));

function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <Login />
      </AnimatePresence>
    );
  }

  return (
    <MainLayout>
      <Suspense fallback={<div className="flex h-[50vh] items-center justify-center"><div className="animate-pulse flex space-x-4"><div className="rounded-full bg-[var(--accent-primary)] h-3 w-3"></div><div className="rounded-full bg-[var(--accent-primary)] h-3 w-3"></div><div className="rounded-full bg-[var(--accent-primary)] h-3 w-3"></div></div></div>}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/dat" element={<DatUsers />} />
            <Route path="/dialers" element={<Dialers />} />
            <Route path="/summary" element={<SystemSummary />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </MainLayout>
  );
}

export default App;
