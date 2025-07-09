import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertTriangle, Settings, Zap, Database, TestTube } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export const SystemSettings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [dbTesting, setDbTesting] = useState(false);
  const [dbTestResult, setDbTestResult] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateSettings(formData);
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleReferralChange = (level: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      referralCommissions: {
        ...prev.referralCommissions,
        [level]: value
      }
    }));
  };

  const testDatabaseConnection = async () => {
    setDbTesting(true);
    setDbTestResult(null);
    
    // Simulate database connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure
    const success = Math.random() > 0.3;
    setDbTestResult(success ? 'success' : 'failed');
    setDbTesting(false);
  };

  return (
    <div className="space-y-8">
      {/* Platform Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Platform Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Daily Profit Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.dailyProfitRate}
              onChange={(e) => handleInputChange('dailyProfitRate', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
            />
            <p className="text-xs text-gray-400 mt-1">Current: {formData.dailyProfitRate}% daily return</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Staking Lock Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={formData.stakingLockDuration}
              onChange={(e) => handleInputChange('stakingLockDuration', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
            />
            <p className="text-xs text-gray-400 mt-1">Lock period for staked tokens</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              USDT to ETL Rate
            </label>
            <input
              type="number"
              min="1"
              value={formData.usdtToEtlRate}
              onChange={(e) => handleInputChange('usdtToEtlRate', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
            />
            <p className="text-xs text-gray-400 mt-1">1 USDT = {formData.usdtToEtlRate} ETL</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ETL to USDT Rate (Withdrawal)
            </label>
            <input
              type="number"
              min="1"
              value={formData.etlToUsdtRate}
              onChange={(e) => handleInputChange('etlToUsdtRate', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
            />
            <p className="text-xs text-gray-400 mt-1">{formData.etlToUsdtRate} ETL = 1 USDT</p>
          </div>
        </div>
      </motion.div>

      {/* Referral Commission Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-etl-accent to-etl-primary rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Referral Commission Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { key: 'level1', label: 'Level 1 (%)' },
            { key: 'level2', label: 'Level 2 (%)' },
            { key: 'level3', label: 'Level 3 (%)' },
            { key: 'level4', label: 'Level 4 (%)' },
          ].map((level) => (
            <div key={level.key}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {level.label}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.referralCommissions[level.key as keyof typeof formData.referralCommissions]}
                onChange={(e) => handleReferralChange(level.key, parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* API & Wallet Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-etl-gold to-etl-warning rounded-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">API & Wallet Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Binance API Key
            </label>
            <input
              type="password"
              value={formData.binanceApiKey}
              onChange={(e) => handleInputChange('binanceApiKey', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="Enter Binance API Key"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Binance API Secret
            </label>
            <input
              type="password"
              value={formData.binanceApiSecret}
              onChange={(e) => handleInputChange('binanceApiSecret', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="Enter Binance API Secret"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Main Wallet Address
            </label>
            <input
              type="text"
              value={formData.mainWalletAddress}
              onChange={(e) => handleInputChange('mainWalletAddress', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="Enter main wallet address"
            />
          </div>
        </div>
      </motion.div>

      {/* Database Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Database Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Database Host
            </label>
            <input
              type="text"
              defaultValue="localhost"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="Database host"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Database Port
            </label>
            <input
              type="number"
              defaultValue="3306"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="Database port"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Database Name
            </label>
            <input
              type="text"
              defaultValue="etl_finance"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="Database name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Database Username
            </label>
            <input
              type="text"
              defaultValue="root"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="Database username"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Database Password
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
                placeholder="Database password"
              />
              <button
                onClick={testDatabaseConnection}
                disabled={dbTesting}
                className="px-4 py-2 bg-gradient-to-r from-etl-primary to-etl-secondary text-white rounded-lg hover:shadow-glow transition-all disabled:opacity-50 flex items-center space-x-2"
              >
                <TestTube className="h-4 w-4" />
                <span>{dbTesting ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>
            {dbTestResult && (
              <div className={`mt-2 text-sm ${dbTestResult === 'success' ? 'text-etl-success' : 'text-red-400'}`}>
                {dbTestResult === 'success' ? '✓ Connection successful' : '✗ Connection failed'}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Support Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Support Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Telegram Support Username
            </label>
            <input
              type="text"
              value={formData.telegramSupport}
              onChange={(e) => handleInputChange('telegramSupport', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="@username"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-300">Live Support</label>
              <p className="text-xs text-gray-400">Enable/disable support button</p>
            </div>
            <button
              onClick={() => handleInputChange('supportEnabled', !formData.supportEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.supportEnabled ? 'bg-etl-success' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.supportEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Warning Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-amber-400 mt-0.5" />
          <div>
            <h4 className="text-amber-300 font-medium mb-2">Important Notice</h4>
            <ul className="text-sm text-amber-200 space-y-1">
              <li>• Changes to rates affect all users immediately</li>
              <li>• Database changes require system restart</li>
              <li>• Always backup before making major changes</li>
              <li>• Test API connections before saving</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-etl-primary to-etl-secondary text-white rounded-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Save className="h-5 w-5" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </motion.div>
    </div>
  );
};