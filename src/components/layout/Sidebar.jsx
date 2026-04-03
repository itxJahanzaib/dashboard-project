import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, PhoneCall, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'DAT Users', path: '/dat', icon: Users },
  { name: 'Dialers', path: '/dialers', icon: PhoneCall },
  { name: 'System Summary', path: '/summary', icon: Activity },
];

export function Sidebar() {
  return (
    <div className="w-64 border-r border-[var(--border-default)] bg-[var(--bg-elevated)] min-h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-[var(--border-default)]">
        <h1 className="font-display text-2xl font-bold tracking-wider text-[var(--accent-primary)]">ASH DASHBOARD</h1>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
              )
            }
          >
            <item.icon className="mr-3 flex-shrink-0 h-5 w-5" />
            <span className="font-mono">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border-default)]">
        <div className="text-xs font-mono text-[var(--text-muted)] mt-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--semantic-positive)] shadow-[0_0_8px_var(--semantic-positive)] block"></span>
          System Online
        </div>
      </div>
    </div>
  );
}
