import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Badge } from '../ui/Badge';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { Card } from '../ui/Card';

export function DatUserTable({ 
  filteredUsers, 
  activeMailId, 
  onStatusToggle, 
  onEditClick, 
  onDeleteClick, 
  onRowClick 
}) {
  return (
    <div className="overflow-x-auto min-h-[400px]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[var(--bg-elevated)]/50 border-b border-[var(--border-default)] text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider">
            <th className="p-4 font-medium">Client Name</th>
            <th className="p-4 font-medium">Username</th>
            <th className="p-4 font-medium">Price</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Start Date</th>
            <th className="p-4 font-medium">End Date</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr 
                key={user.id}
                onClick={() => onRowClick(user)}
                className={`border-b border-[var(--border-default)] transition-colors group cursor-pointer ${
                  user.status === 'Unpaid' ? 'bg-[var(--semantic-negative)]/5' : 'hover:bg-[var(--bg-elevated)]/50'
                }`}
                title="Click to view purchase history"
              >
                <td className="p-4 font-mono text-sm">{user.client_name}</td>
                <td className="p-4 font-mono text-sm text-[var(--text-secondary)]">{user.username || '-'}</td>
                <td className="p-4 font-mono text-sm text-[var(--text-primary)]">{formatCurrency(user.price || 0)}</td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => onStatusToggle(user.id, user.status === 'Paid' ? 'Unpaid' : 'Paid')} className="focus:outline-none hover:scale-105 transition-transform">
                    <Badge status={user.status}>{user.status}</Badge>
                  </button>
                </td>
                <td className="p-4 font-mono text-sm text-[var(--text-muted)]">{format(new Date(user.start_date), 'MMM dd, yyyy')}</td>
                <td className="p-4 font-mono text-sm text-[var(--text-muted)]">{format(new Date(user.end_date), 'MMM dd, yyyy')}</td>
                <td className="p-4 text-right flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => onEditClick(user)}
                    className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors opacity-0 group-hover:opacity-100 p-1"
                    title="Edit User"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => onDeleteClick(user.id)}
                    className="text-[var(--text-muted)] hover:text-[var(--semantic-negative)] transition-colors opacity-0 group-hover:opacity-100 p-1"
                    title="Move to Bin"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-8 text-center text-[var(--text-muted)] font-mono text-sm">
                {activeMailId ? "No users found in this mail." : "Select or create a mail group to see users."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
