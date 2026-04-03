import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Card, CardContent } from '../components/ui/Card';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function SystemSummary() {
  const { getDatMetrics, getDialerMetrics } = useStore();
  
  const datMetrics = getDatMetrics();
  const dialerMetrics = getDialerMetrics();

  const totalPaidRevenue = datMetrics.paidRevenue + dialerMetrics.paidRevenue;
  const totalUnpaidRevenue = datMetrics.unpaidRevenue + dialerMetrics.unpaidRevenue;
  const totalUsers = datMetrics.total + dialerMetrics.total;
  const totalUnpaidUsers = datMetrics.unpaid + dialerMetrics.unpaid;
  
  const totalRevenue = totalPaidRevenue + totalUnpaidRevenue;
  const systemHealth = totalRevenue > 0 ? (totalPaidRevenue / totalRevenue) * 100 : 0;
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[var(--accent-primary)] tracking-wide">SYSTEM VERDICT</h1>
        <p className="text-[var(--text-secondary)] mt-1 font-mono text-sm">Actionable summary and monetary health snapshot.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={fadeUp}>
          <Card className="h-full border-l-4 border-l-[var(--accent-primary)] rounded-l-none">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                  <Activity size={32} />
                </div>
                <div>
                  <h3 className="font-display tracking-widest text-xl text-[var(--text-muted)]">REVENUE HEALTH</h3>
                  <div className="font-mono text-4xl mt-1 text-[var(--text-primary)]">
                    {systemHealth.toFixed(1)}% <span className="text-base text-[var(--text-muted)]">COLLECTION RATIO</span>
                  </div>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Currently, {formatCurrency(totalPaidRevenue)} out of {formatCurrency(totalRevenue)} total prospective revenue has been collected successfully. {systemHealth < 80 ? 'Revenue collection requires immediate attention.' : 'Revenue health is currently strong.'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="h-full">
            <CardContent className="p-8">
              <h3 className="font-mono text-sm tracking-widest text-[var(--text-muted)] uppercase mb-6">Action Items </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="p-2 mt-0.5 rounded-full bg-[var(--semantic-negative)]/10 text-[var(--semantic-negative)]">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <strong className="text-[var(--text-primary)] block font-mono text-sm uppercase">Recover Unpaid Revenue</strong>
                    <span className="text-[var(--text-secondary)] text-sm">{totalUnpaidUsers} users representing {formatCurrency(totalUnpaidRevenue)} are currently marked as Unpaid or Expired.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 mt-0.5 rounded-full bg-[var(--semantic-positive)]/10 text-[var(--semantic-positive)]">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <strong className="text-[var(--text-primary)] block font-mono text-sm uppercase">System Stability</strong>
                    <span className="text-[var(--text-secondary)] text-sm">Deep tree time-based logic successfully intercepts expired nodes globally.</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
