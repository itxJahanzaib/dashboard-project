import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ children, status, className }) {
  const isPaid = status === 'Paid';
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono uppercase tracking-wider",
        isPaid 
          ? "bg-[var(--semantic-positive)]/10 text-[var(--semantic-positive)] border border-[var(--semantic-positive)]/20" 
          : "bg-[var(--semantic-negative)]/10 text-[var(--semantic-negative)] border border-[var(--semantic-negative)]/20",
        className
      )}
    >
      {children}
    </span>
  );
}
