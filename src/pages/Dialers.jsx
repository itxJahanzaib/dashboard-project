import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Plus, Search, Trash2, FileUp, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import { Modal, Input, Select, Button } from '../components/ui/Modal';
import { formatCurrency } from '../lib/utils';

export default function Dialers() {
  const { dialers, deleteDialer, updateDialerStatus, addDialer, importDialers } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const fileInputRef = useRef(null);

  const [isDialerModalOpen, setIsDialerModalOpen] = useState(false);
  const [newDialer, setNewDialer] = useState({
    client_name: '',
    dialer_type: 'Zoom',
    dialer_mail: '',
    price: 0,
    status: 'Paid',
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd')
  });

  const filteredDialers = useMemo(() => {
    return dialers.filter(d => {
      const matchSearch = d.client_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.dialer_mail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === 'All' || d.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [dialers, searchQuery, filterStatus]);

  const handleCreateDialer = (e) => {
    e.preventDefault();
    if (!newDialer.client_name || !newDialer.dialer_mail) return;

    addDialer({
      id: Date.now().toString(),
      ...newDialer,
      price: Number(newDialer.price) || 0,
      start_date: new Date(newDialer.start_date).toISOString(),
      end_date: new Date(newDialer.end_date).toISOString(),
    });

    setIsDialerModalOpen(false);
    setNewDialer({
      client_name: '',
      dialer_type: 'Zoom',
      dialer_mail: '',
      price: 0,
      status: 'Paid',
      start_date: format(new Date(), 'yyyy-MM-dd'),
      end_date: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd')
    });
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n').map(row => row.trim()).filter(row => row.length > 0);
      
      // Assume CSV header: client_name,dialer_type,dialer_mail,price,status,start_date,end_date
      if (rows.length > 0) {
        const parsedDialers = [];
        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
          if (cols.length >= 7) {
            let parsedStatus = cols[4].toLowerCase();
            if (parsedStatus !== 'paid') parsedStatus = 'Unpaid';
            else parsedStatus = 'Paid';

            parsedDialers.push({
              id: Date.now().toString() + '-' + i,
              client_name: cols[0] || 'Unknown',
              dialer_type: cols[1] || 'Zoom',
              dialer_mail: cols[2] || '',
              price: Number(cols[3]) || 0,
              status: parsedStatus,
              start_date: new Date(cols[5]).toISOString() || new Date().toISOString(),
              end_date: new Date(cols[6]).toISOString() || new Date().toISOString(),
            });
          }
        }
        
        if (parsedDialers.length > 0) {
          importDialers(parsedDialers);
          alert(`Successfully imported ${parsedDialers.length} dialers!`);
        } else {
          alert('No valid dialers found in CSV. Expected: client_name,dialer_type,dialer_mail,price,status,start_date,end_date');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleCSVExport = () => {
    if (filteredDialers.length === 0) return alert('No data to export.');
    const headers = ["Client Name", "Dialer Type", "Dialer Mail", "Price", "Status", "Start Date", "End Date"];
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + filteredDialers.map(e => `"${e.client_name}","${e.dialer_type}","${e.dialer_mail}",${e.price},${e.status},${format(new Date(e.start_date), 'yyyy-MM-dd')},${format(new Date(e.end_date), 'yyyy-MM-dd')}`).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dialers_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--accent-primary)] tracking-wide">DIALERS</h1>
          <p className="text-[var(--text-secondary)] mt-1 font-mono text-sm">Manage dialer assignments and accounts.</p>
        </div>
        <div className="flex gap-2">
          <input type="file" accept=".csv" ref={fileInputRef} onChange={handleCSVUpload} className="hidden" />
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10">
            <FileUp size={16} /> Import CSV
          </Button>
          <Button variant="secondary" onClick={handleCSVExport} className="flex items-center gap-2 text-[var(--text-primary)]">
            <FileDown size={16} /> Export CSV
          </Button>
          <Button onClick={() => setIsDialerModalOpen(true)} className="flex items-center gap-2">
            <Plus size={16} /> Add Dialer
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card>
          <div className="p-4 border-b border-[var(--border-default)] flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input 
                type="text" 
                placeholder="Search client or mail..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] text-[var(--text-primary)] rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-mono text-sm"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-[var(--bg-base)] border border-[var(--border-default)] text-[var(--text-primary)] rounded-md px-4 py-2 focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-mono text-sm min-w-[120px]"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-elevated)]/50 border-b border-[var(--border-default)] text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider">
                  <th className="p-4 font-medium">Client Name</th>
                  <th className="p-4 font-medium">Dialer Type</th>
                  <th className="p-4 font-medium">Dialer Mail</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Start Date</th>
                  <th className="p-4 font-medium">End Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredDialers.length > 0 ? (
                    filteredDialers.map((dialer) => (
                      <motion.tr 
                        key={dialer.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`border-b border-[var(--border-default)] transition-colors group ${
                          dialer.status === 'Unpaid' ? 'bg-[var(--semantic-negative)]/5' : 'hover:bg-[var(--bg-elevated)]/50'
                        }`}
                      >
                        <td className="p-4 font-mono text-sm">{dialer.client_name}</td>
                        <td className="p-4 text-sm text-[var(--text-secondary)]">{dialer.dialer_type}</td>
                        <td className="p-4 text-sm text-[var(--text-secondary)] font-mono">{dialer.dialer_mail}</td>
                        <td className="p-4 font-mono text-sm text-[var(--text-primary)]">{formatCurrency(dialer.price || 0)}</td>
                        <td className="p-4">
                          <button onClick={() => updateDialerStatus(dialer.id, dialer.status === 'Paid' ? 'Unpaid' : 'Paid')} className="focus:outline-none">
                            <Badge status={dialer.status}>{dialer.status}</Badge>
                          </button>
                        </td>
                        <td className="p-4 font-mono text-sm text-[var(--text-muted)]">{format(new Date(dialer.start_date), 'MMM dd, yyyy')}</td>
                        <td className="p-4 font-mono text-sm text-[var(--text-muted)]">{format(new Date(dialer.end_date), 'MMM dd, yyyy')}</td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => deleteDialer(dialer.id)}
                            className="text-[var(--text-muted)] hover:text-[var(--semantic-negative)] transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-[var(--text-muted)] font-mono text-sm">
                        No dialers found in this view.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Add Dialer Modal */}
      <Modal isOpen={isDialerModalOpen} onClose={() => setIsDialerModalOpen(false)} title="Add New Dialer">
        <form onSubmit={handleCreateDialer} className="flex flex-col gap-4">
          <Input 
            label="Client Name" 
            placeholder="Name of the client/business" 
            value={newDialer.client_name}
            onChange={e => setNewDialer({...newDialer, client_name: e.target.value})}
            required
            autoFocus
          />
          <Input 
            label="Dialer Mail" 
            placeholder="e.g. dialer@company.com" 
            value={newDialer.dialer_mail}
            onChange={e => setNewDialer({...newDialer, dialer_mail: e.target.value})}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Dialer Type" 
              value={newDialer.dialer_type}
              onChange={e => setNewDialer({...newDialer, dialer_type: e.target.value})}
            >
              <option value="Zoom">Zoom</option>
              <option value="Google Voice">Google Voice</option>
              <option value="Teams">Teams</option>
              <option value="Other">Other</option>
            </Select>
            <Input 
              type="number"
              label="Price" 
              placeholder="0.00" 
              value={newDialer.price}
              onChange={e => setNewDialer({...newDialer, price: e.target.value})}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              type="date"
              label="Start Date" 
              value={newDialer.start_date}
              onChange={e => setNewDialer({...newDialer, start_date: e.target.value})}
              required
            />
            <Input 
              type="date"
              label="End Date" 
              value={newDialer.end_date}
              onChange={e => setNewDialer({...newDialer, end_date: e.target.value})}
              required
            />
          </div>

          <Select 
            label="Status" 
            value={newDialer.status}
            onChange={e => setNewDialer({...newDialer, status: e.target.value})}
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </Select>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsDialerModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Dialer</Button>
          </div>
        </form>
      </Modal>

    </motion.div>
  );
}
