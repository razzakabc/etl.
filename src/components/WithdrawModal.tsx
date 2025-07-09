import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, AlertCircle } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  etlBalance: number;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  etlBalance,
}) => {
  const { settings } = useSettings();
  const [etlAmount, setEtlAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const usdtAmount = etlAmount ? (parseFloat(etlAmount) / settings.etlToUsdtRate).toFixed(6) : '0';

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(etlAmount);
    
    if (amount > etlBalance) {
      alert('Insufficient ETL balance');
      return;
    }

    if (amount < 1000) {
      alert('Minimum withdrawal amount is 1000 ETL');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onClose();
    alert('Withdrawal request submitted successfully! Admin will review and process your request.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white/10 backdrop-blur-glass border border-white/20 rounded-xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-display">Withdraw ETL</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ETL Amount
                </label>
                <input
                  type="number"
                  step="1"
                  min="1000"
                  max={etlBalance}
                  value={etlAmount}
                  onChange={(e) => setEtlAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
                  placeholder="Enter ETL amount"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Available: {etlBalance.toLocaleString()} ETL | Min: 1,000 ETL
                </p>
              </div>

              {etlAmount && (
                <div className="bg-etl-primary/10 border border-etl-primary/20 rounded-lg p-3">
                  <p className="text-sm text-etl-primary font-medium">
                    You will receive: {usdtAmount} USDT
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Rate: {settings.etlToUsdtRate} ETL = 1 USDT
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  USDT Wallet Address (BEP-20)
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
                    placeholder="Enter BEP-20 wallet address"
                    required
                  />
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                  <div className="text-sm text-amber-300">
                    <p className="font-medium">Important:</p>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>• Processing time: 24-48 hours</li>
                      <li>• Manual approval required</li>
                      <li>• Ensure wallet address is correct</li>
                      <li>• Only BEP-20 USDT supported</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-etl-primary to-etl-secondary text-white rounded-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isProcessing ? 'Processing...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};