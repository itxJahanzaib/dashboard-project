import React from 'react';
import { format } from 'date-fns';
import { Modal, Button } from '../../ui/Modal';
import { formatCurrency } from '../../../lib/utils';
import { Badge } from '../../ui/Badge';
import { History, AlertTriangle } from 'lucide-react';

export function HistoryModal({ isOpen, onClose, user, datType, isDeleted = false }) {
  if (!user) return null;

  const historyLogs = user.history || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Purchase History" size="lg">
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        
        {/* User Snapshot Header */}
        <div className={`p-4 rounded-xl border ${isDeleted ? 'bg-[var(--semantic-negative)]/5 border-[var(--semantic-negative)]/30' : 'bg-[var(--bg-elevated)] border-[var(--border-default)]'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold font-display tracking-wider text-[var(--accent-primary)] mb-1">
                {user.client_name} {isDeleted && <span className="text-xs ml-2 text-[var(--semantic-negative)] px-2 py-0.5 rounded bg-[var(--semantic-negative)]/10 font-mono">DELETED</span>}
              </h3>
              <p className="text-sm font-mono text-[var(--text-secondary)]">@{user.username || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase mb-1">DAT Type</p>
              <p className="font-bold font-mono text-sm">{datType || user.original_dat_type || 'Unknown'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-default)]">
            <div>
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase">Status</p>
              <div className="mt-1"><Badge status={user.status}>{user.status}</Badge></div>
            </div>
            <div>
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase">Price</p>
              <p className="font-mono text-sm mt-1">{formatCurrency(user.price)}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase">Start Date</p>
              <p className="font-mono text-sm mt-1">{format(new Date(user.start_date), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase">End Date</p>
              <p className="font-mono text-sm mt-1">{format(new Date(user.end_date), 'MMM dd, yyyy')}</p>
            </div>
          </div>
        </div>

        {/* Action Log Table */}
        <div>
          <h4 className="flex items-center gap-2 font-display text-lg mb-3 tracking-wide">
            <History size={18} className="text-[var(--accent-primary)]" /> Past Modifications & Purchases
          </h4>
          
          {historyLogs.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[var(--border-default)] rounded-xl bg-[var(--bg-base)]">
              <AlertTriangle size={24} className="mx-auto text-[var(--text-muted)] mb-2" />
              <p className="font-mono text-sm text-[var(--text-muted)]">No past history recorded for this user.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
              <table className="w-full text-left border-collapse bg-[var(--bg-base)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)]/80 border-b border-[var(--border-default)] text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider">
                    <th className="p-3 font-medium">Logged At</th>
                    <th className="p-3 font-medium">Action</th>
                    <th className="p-3 font-medium">Price</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Start Date</th>
                    <th className="p-3 font-medium">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {historyLogs.slice().reverse().map((log, idx) => (
                    <tr key={idx} className="border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--bg-elevated)]/30 transition-colors">
                      <td className="p-3 font-mono text-xs text-[var(--text-secondary)] whitespace-nowrap">
                        {format(new Date(log.modified_at), 'MMM dd, yyyy HH:mm')}
                      </td>
                      <td className="p-3 font-mono text-xs font-bold text-[var(--accent-primary)]">{log.action}</td>
                      <td className="p-3 font-mono text-xs">{formatCurrency(log.price || 0)}</td>
                      <td className="p-3"><Badge status={log.status}>{log.status}</Badge></td>
                      <td className="p-3 font-mono text-xs text-[var(--text-secondary)] whitespace-nowrap">{format(new Date(log.start_date), 'MMM dd, yyyy')}</td>
                      <td className="p-3 font-mono text-xs text-[var(--text-secondary)] whitespace-nowrap">{format(new Date(log.end_date), 'MMM dd, yyyy')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={onClose} variant="secondary">Close</Button>
        </div>
      </div>
    </Modal>
  );
}
