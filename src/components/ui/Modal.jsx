import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-2xl rounded-xl w-full max-w-md pointer-events-auto overflow-hidden flex flex-col max-h-full"
            >
              <div className="flex justify-between items-center p-5 border-b border-[var(--border-default)]">
                <h3 className="font-display text-lg tracking-wider font-bold">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Input({ label, error, className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-mono text-[var(--text-secondary)]">{label}</label>}
      <input
        className={cn(
          "bg-[var(--bg-base)] border border-[var(--border-default)] text-[var(--text-primary)] rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all",
          error && "border-[var(--semantic-negative)] focus:border-[var(--semantic-negative)] focus:ring-[var(--semantic-negative)]"
        )}
        {...props}
      />
      {error && <span className="text-xs text-[var(--semantic-negative)] mt-0.5">{error}</span>}
    </div>
  );
}

export function Select({ label, error, children, className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-mono text-[var(--text-secondary)]">{label}</label>}
      <select
        className={cn(
          "bg-[var(--bg-base)] border border-[var(--border-default)] text-[var(--text-primary)] rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all",
          error && "border-[var(--semantic-negative)] focus:border-[var(--semantic-negative)] focus:ring-[var(--semantic-negative)]"
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-[var(--semantic-negative)] mt-0.5">{error}</span>}
    </div>
  );
}

export function Button({ children, variant = 'primary', className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-mono text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-surface)]",
        variant === 'primary' && "bg-[var(--accent-primary)] text-[#0A0A0A] font-bold hover:opacity-90 focus:ring-[var(--accent-primary)]",
        variant === 'secondary' && "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-base)] focus:ring-[var(--border-default)]",
        variant === 'danger' && "bg-[var(--semantic-negative)]/10 text-[var(--semantic-negative)] border border-[var(--semantic-negative)] hover:bg-[var(--semantic-negative)]/20 focus:ring-[var(--semantic-negative)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
