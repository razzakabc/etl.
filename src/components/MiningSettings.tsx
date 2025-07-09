import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertTriangle, Settings, Zap } from 'lucide-react';

export const MiningSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    dailyRate: 8.0,
    minimumDeposit: 50,
    minimumWithdrawal: 10,
    withdrawalFee: 2.0,
    maxDailyWithdrawal: 10000,
    miningEnabled: true,
    autoCompound: false,
    referralBonus: 5.0,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  const handleInputChange = (key: string, value: number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Mining Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-crypto-bitcoin/20 rounded-lg">
            <Zap className="h-6 w-6 text-crypto-bitcoin" />
          </div>
          <h3 className="text-xl font-bold text-white">Mining Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Daily Mining Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="20"
              value={settings.dailyRate}
              onChange={(e) => handleInputChange('dailyRate', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-400 mt-1">Current: {settings.dailyRate}% daily return</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Referral Bonus (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={settings.referralBonus}
              onChange={(e) => handleInputChange('referralBonus', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-400 mt-1">Bonus for successful referrals</p>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Mining Status</label>
                <p className="text-xs text-gray-400">Enable or disable mining globally</p>
              </div>
              <button
                onClick={() => handleInputChange('miningEnabled', !settings.miningEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.miningEnabled ? 'bg-crypto-success' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.miningEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Financial Limits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary-500/20 rounded-lg">
            <Settings className="h-6 w-6 text-primary-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Financial Limits</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Minimum Deposit ($)
            </label>
            <input
              type="number"
              min="1"
              value={settings.minimumDeposit}
              onChange={(e) => handleInputChange('minimumDeposit', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Minimum Withdrawal ($)
            </label>
            <input
              type="number"
              min="1"
              value={settings.minimumWithdrawal}
              onChange={(e) => handleInputChange('minimumWithdrawal', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Withdrawal Fee (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={settings.withdrawalFee}
              onChange={(e) => handleInputChange('withdrawalFee', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Max Daily Withdrawal ($)
            </label>
            <input
              type="number"
              min="100"
              value={settings.maxDailyWithdrawal}
              onChange={(e) => handleInputChange('maxDailyWithdrawal', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Warning Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-amber-400 mt-0.5" />
          <div>
            <h4 className="text-amber-300 font-medium mb-2">Important Notice</h4>
            <ul className="text-sm text-amber-200 space-y-1">
              <li>• Changes to mining rates affect all active users immediately</li>
              <li>• Withdrawal limit changes apply to new withdrawal requests</li>
              <li>• Disabling mining will pause all active mining operations</li>
              <li>• Always backup settings before making major changes</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="h-5 w-5" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </motion.div>
    </div>
  );
};