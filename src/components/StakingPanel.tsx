import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Clock, TrendingUp, Lock } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface Stake {
  id: string;
  amount: number;
  dailyProfit: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed';
}

interface StakingPanelProps {
  etlBalance: number;
  activeStakes: Stake[];
  onStake: (amount: number) => void;
}

export const StakingPanel: React.FC<StakingPanelProps> = ({
  etlBalance,
  activeStakes,
  onStake,
}) => {
  const { settings } = useSettings();
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = async () => {
    const amount = parseFloat(stakeAmount);
    if (amount <= 0 || amount > etlBalance) return;

    setIsStaking(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onStake(amount);
    setStakeAmount('');
    setIsStaking(false);
  };

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-lg">
          <Coins className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white font-display">Staking Panel</h3>
      </div>

      {/* Staking Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Stake Amount (ETL)
          </label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
            placeholder="Enter amount to stake"
          />
          <p className="text-xs text-gray-400 mt-1">
            Available: {etlBalance.toLocaleString()} ETL
          </p>
        </div>

        <div className="bg-etl-primary/10 border border-etl-primary/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-etl-primary" />
            <span className="text-sm font-medium text-etl-primary">Staking Details</span>
          </div>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Daily Profit: {settings.dailyProfitRate}%</li>
            <li>• Lock Duration: {settings.stakingLockDuration} days</li>
            <li>• Estimated Daily Earnings: {stakeAmount ? (parseFloat(stakeAmount) * settings.dailyProfitRate / 100).toFixed(2) : '0'} ETL</li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStake}
          disabled={!stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > etlBalance || isStaking}
          className="w-full bg-gradient-to-r from-etl-primary to-etl-secondary text-white py-3 px-4 rounded-lg font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isStaking ? 'Staking...' : 'Stake ETL'}
        </motion.button>
      </div>

      {/* Active Stakes */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4 font-display">Active Stakes</h4>
        {activeStakes.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No active stakes</p>
        ) : (
          <div className="space-y-3">
            {activeStakes.map((stake) => (
              <div
                key={stake.id}
                className="bg-white/5 border border-white/10 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-etl-gold" />
                    <span className="font-medium text-white">
                      {stake.amount.toLocaleString()} ETL
                    </span>
                  </div>
                  <span className="text-sm text-etl-success">
                    +{stake.dailyProfit.toLocaleString()} ETL/day
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Started: {stake.startDate.toLocaleDateString()}</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeRemaining(stake.endDate)} remaining</span>
                  </span>
                </div>
                <div className="mt-2 bg-white/5 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-etl-primary to-etl-secondary h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.max(0, Math.min(100, 
                        ((Date.now() - stake.startDate.getTime()) / 
                        (stake.endDate.getTime() - stake.startDate.getTime())) * 100
                      ))}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};