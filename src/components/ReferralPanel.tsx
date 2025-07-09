import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, CheckCircle, Gift } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface ReferralPanelProps {
  referralCode: string;
}

export const ReferralPanel: React.FC<ReferralPanelProps> = ({ referralCode }) => {
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);
  
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralStats = [
    { label: 'Total Referrals', value: '12', color: 'text-etl-primary' },
    { label: 'Active Referrals', value: '8', color: 'text-etl-success' },
    { label: 'Total Earned', value: '15,420 ETL', color: 'text-etl-gold' },
    { label: 'This Month', value: '2,340 ETL', color: 'text-etl-accent' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-etl-accent to-etl-primary rounded-lg">
          <Users className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white font-display">Referral Program</h3>
      </div>

      {/* Referral Link */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Referral Link
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyReferralLink}
            className="px-4 py-2 bg-gradient-to-r from-etl-primary to-etl-secondary text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 font-display">Commission Structure</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { level: 'Level 1', rate: settings.referralCommissions.level1 },
            { level: 'Level 2', rate: settings.referralCommissions.level2 },
            { level: 'Level 3', rate: settings.referralCommissions.level3 },
            { level: 'Level 4', rate: settings.referralCommissions.level4 },
          ].map((item) => (
            <div key={item.level} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-400">{item.level}</p>
              <p className="text-lg font-bold text-etl-primary">{item.rate}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Stats */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3 font-display">Your Stats</h4>
        <div className="grid grid-cols-2 gap-3">
          {referralStats.map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-lg p-3">
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-etl-primary/10 border border-etl-primary/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Gift className="h-4 w-4 text-etl-primary mt-0.5" />
          <div className="text-sm text-etl-primary">
            <p className="font-medium">Earn commissions on deposits only!</p>
            <p className="text-xs text-gray-400 mt-1">
              Commissions are paid in ETL tokens when your referrals make deposits.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};