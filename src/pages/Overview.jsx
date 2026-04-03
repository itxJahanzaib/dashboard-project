import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Card, CardContent } from '../components/ui/Card';
import { Users, PhoneCall, DollarSign, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../lib/utils';

export default function Overview() {
  const { getDatMetrics, getDialerMetrics } = useStore();
  
  const datMetrics = getDatMetrics();
  const dialerMetrics = getDialerMetrics();

  const totalUsers = datMetrics.total + dialerMetrics.total;
  const totalPaidRevenue = datMetrics.paidRevenue + dialerMetrics.paidRevenue;
  const totalUnpaidRevenue = datMetrics.unpaidRevenue + dialerMetrics.unpaidRevenue;

  const pieData = [
    { name: 'Paid Revenue', value: totalPaidRevenue, color: 'var(--semantic-positive)' },
    { name: 'Unpaid Revenue', value: totalUnpaidRevenue, color: 'var(--semantic-negative)' },
  ];

  const barData = [
    { name: 'DAT', Paid: datMetrics.paidRevenue, Unpaid: datMetrics.unpaidRevenue },
    { name: 'Dialers', Paid: dialerMetrics.paidRevenue, Unpaid: dialerMetrics.unpaidRevenue },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[var(--accent-primary)] tracking-wide">SYSTEM OVERVIEW</h1>
        <p className="text-[var(--text-secondary)] mt-1 font-mono text-sm">Real-time revenue metrics and user statuses.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div variants={fadeUp}>
           <Card className="hover:shadow-[0_0_20px_rgba(24,119,242,0.15)] transition-shadow duration-300">
             <CardContent className="p-6">
                <div className="flex items-center mb-4 pb-4 border-b border-[var(--border-default)]">
                  <div className="p-3 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <Users size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Total DAT Users</p>
                    <h3 className="text-3xl font-bold font-mono">{datMetrics.total}</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {Object.entries(datMetrics.breakdown).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-sm font-mono">
                      <span className="text-[var(--text-secondary)]">{key}</span>
                      <span className="font-bold text-[var(--text-primary)] px-3 py-1 bg-[var(--bg-elevated)] rounded-md">{val} Users</span>
                    </div>
                  ))}
                </div>
             </CardContent>
           </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
           <Card className="hover:shadow-[0_0_20px_rgba(24,119,242,0.15)] transition-shadow duration-300">
             <CardContent className="p-6">
                <div className="flex items-center mb-4 pb-4 border-b border-[var(--border-default)]">
                  <div className="p-3 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <PhoneCall size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Total Dialer Users</p>
                    <h3 className="text-3xl font-bold font-mono">{dialerMetrics.total}</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {Object.entries(dialerMetrics.breakdown).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-sm font-mono">
                      <span className="text-[var(--text-secondary)]">{key}</span>
                      <span className="font-bold text-[var(--text-primary)] px-3 py-1 bg-[var(--bg-elevated)] rounded-md">{val} Users</span>
                    </div>
                  ))}
                </div>
             </CardContent>
           </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={fadeUp}>
          <Card className="hover:shadow-[0_0_20px_rgba(24,119,242,0.15)] transition-shadow duration-300">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Total DAT Revenue</p>
                <h3 className="text-2xl font-bold font-mono">{formatCurrency(datMetrics.totalRevenue)}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="hover:shadow-[0_0_20px_rgba(24,119,242,0.15)] transition-shadow duration-300">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                <PhoneCall size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Total Dialer Revenue</p>
                <h3 className="text-2xl font-bold font-mono">{formatCurrency(dialerMetrics.totalRevenue)}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow duration-300">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-lg bg-[var(--semantic-positive)]/10 text-[var(--semantic-positive)]">
                <DollarSign size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Total Paid</p>
                <h3 className="text-2xl font-bold font-mono text-[var(--semantic-positive)]">{formatCurrency(totalPaidRevenue)}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-shadow duration-300 border-[var(--semantic-negative)]/30">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-lg bg-[var(--semantic-negative)]/10 text-[var(--semantic-negative)]">
                <AlertCircle size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Total Unpaid</p>
                <h3 className="text-2xl font-bold font-mono text-[var(--semantic-negative)]">{formatCurrency(totalUnpaidRevenue)}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={fadeUp}>
          <Card className="h-full">
            <div className="px-6 py-4 border-b border-[var(--border-default)]">
              <h3 className="font-display text-lg tracking-wider">Revenue Breakdown (Paid vs Unpaid)</h3>
            </div>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="h-full">
            <div className="px-6 py-4 border-b border-[var(--border-default)]">
              <h3 className="font-display text-lg tracking-wider">Service Revenue Comparison</h3>
            </div>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    cursor={{fill: 'var(--bg-elevated)'}}
                    contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                  />
                  <Bar dataKey="Paid" fill="var(--semantic-positive)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Unpaid" fill="var(--semantic-negative)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
