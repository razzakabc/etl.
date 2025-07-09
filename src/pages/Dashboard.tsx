import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatsCard } from '../components/StatsCard';
import { StakingPanel } from '../components/StakingPanel';
import { DepositModal } from '../components/DepositModal';
import { WithdrawModal } from '../components/WithdrawModal';
import { TransactionHistory } from '../components/TransactionHistory';
import { ReferralPanel } from '../components/ReferralPanel';
import { Wallet, TrendingUp, Coins, Users, Upload, Download, Sparkles, Target, Award } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, updateBalance } = useAuth();
  const { settings } = useSettings();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [activeStakes, setActiveStakes] = useState([
    {
      id: '1',
      amount: 100000,
      dailyProfit: 1000,
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      status: 'active' as const,
    }
  ]);

  // Calculate total staked and daily earnings
  const totalStaked = activeStakes.reduce((sum, stake) => sum + stake.amount, 0);
  const dailyEarnings = activeStakes.reduce((sum, stake) => sum + stake.dailyProfit, 0);

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-etl-primary/20 to-etl-secondary/20 rounded-full blur-3xl -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-etl-gold/20 to-etl-accent/20 rounded-full blur-3xl translate-y-24 -translate-x-24" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-xl shadow-glow">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white font-display bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome back, {user.email?.split('@')[0] || 'Trader'}!
                </h1>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl">
                Manage your ETL portfolio, track staking rewards, and explore DeFi opportunities in one powerful dashboard.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-etl-success rounded-full animate-pulse" />
                  <span className="text-etl-success">Live Markets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-etl-primary" />
                  <span className="text-gray-400">Smart Contracts Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-etl-gold" />
                  <span className="text-gray-400">Premium Member</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-0">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDepositModal(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-etl-success to-green-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-etl-success/25 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Deposit USDT</span>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWithdrawModal(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-etl-primary to-etl-secondary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-etl-primary/25 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Withdraw</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Portfolio Value', value: `$${((user.etlBalance ?? 0) * 0.004).toFixed(2)}`, change: '+12.5%', positive: true },
            { label: 'Daily Yield', value: `${dailyEarnings.toLocaleString()} ETL`, change: '+1.0%', positive: true },
            { label: 'Active Stakes', value: activeStakes.length.toString(), change: 'Live', positive: true },
            { label: 'Total Earned', value: `${(user.totalEarned ?? 0).toLocaleString()} ETL`, change: '+15.3%', positive: true },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all group"
            >
              <div className="text-sm text-gray-400 mb-1">{item.label}</div>
              <div className="text-xl font-bold text-white font-display mb-1">{item.value}</div>
              <div className={`text-xs flex items-center space-x-1 ${item.positive ? 'text-etl-success' : 'text-red-400'}`}>
                <TrendingUp className="h-3 w-3" />
                <span>{item.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white font-display">Portfolio Overview</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-etl-success rounded-full animate-pulse" />
              <span>Real-time data</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="ETL Balance"
              value={`${(user.etlBalance ?? 0).toLocaleString()} ETL`}
              icon={Wallet}
              color="etl-primary"
              change="+12.5%"
              delay={0}
            />
            <StatsCard
              title="Total Staked"
              value={`${totalStaked.toLocaleString()} ETL`}
              icon={Coins}
              color="etl-secondary"
              change="+8.2%"
              delay={0.1}
            />
            <StatsCard
              title="Daily Earnings"
              value={`${dailyEarnings.toLocaleString()} ETL`}
              icon={TrendingUp}
              color="etl-success"
              change="+1.0%"
              delay={0.2}
            />
            <StatsCard
              title="Total Earned"
              value={`${(user.totalEarned ?? 0).toLocaleString()} ETL`}
              icon={Users}
              color="etl-gold"
              change="+15.3%"
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <StakingPanel 
              etlBalance={user.etlBalance ?? 0}
              activeStakes={activeStakes}
              onStake={(amount) => {
                const newStake = {
                  id: Date.now().toString(),
                  amount,
                  dailyProfit: amount * (settings.dailyProfitRate / 100),
                  startDate: new Date(),
                  endDate: new Date(Date.now() + settings.stakingLockDuration * 24 * 60 * 60 * 1000),
                  status: 'active' as const,
                };
                setActiveStakes(prev => [...prev, newStake]);
                updateBalance(-amount);
              }}
            />
            <ReferralPanel referralCode={user.referralCode ?? ''} />
          </div>

          {/* Transaction History */}
          <TransactionHistory />
        </motion.div>

        {/* Modals */}
        {showDepositModal && (
          <DepositModal
            isOpen={showDepositModal}
            onClose={() => setShowDepositModal(false)}
            assignedAddress={user.assignedDepositAddress ?? ''}
          />
        )}

        {showWithdrawModal && (
          <WithdrawModal
            isOpen={showWithdrawModal}
            onClose={() => setShowWithdrawModal(false)}
            etlBalance={user.etlBalance ?? 0}
          />
        )}
      </div>
    </DashboardLayout>
  );
};