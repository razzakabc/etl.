import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, QrCode, CheckCircle, Wallet } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignedAddress: string;
}

export const DepositModal: React.FC<DepositModalProps> = ({ 
  isOpen, 
  onClose, 
  assignedAddress 
}) => {
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(assignedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <h3 className="text-xl font-bold text-white font-display">Deposit USDT</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-center space-y-6">
              {/* QR Code Placeholder */}
              <div className="mx-auto w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-16 w-16 text-slate-800 mx-auto mb-2" />
                  <p className="text-slate-600 text-sm">QR Code</p>
                </div>
              </div>

              {/* Deposit Address */}
              <div>
                <p className="text-sm text-gray-400 mb-2">BEP-20 Deposit Address:</p>
                <div className="bg-white/5 border border-white/20 rounded-lg p-3">
                  <p className="text-white text-sm font-mono break-all">{assignedAddress}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="mt-2 flex items-center justify-center space-x-2 w-full py-2 bg-gradient-to-r from-etl-primary to-etl-secondary text-white rounded-lg hover:shadow-glow transition-all"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Exchange Rate */}
              <div className="bg-etl-primary/10 border border-etl-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Wallet className="h-5 w-5 text-etl-primary" />
                  <span className="text-etl-primary font-medium">Exchange Rate</span>
                </div>
                <p className="text-2xl font-bold text-white font-display">
                  1 USDT = {settings.usdtToEtlRate} ETL
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-left">
                <h4 className="text-blue-300 font-medium mb-2">Deposit Instructions:</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Send only USDT (BEP-20) to this address</li>
                  <li>• Minimum deposit: $10 USD</li>
                  <li>• ETL tokens will be credited automatically</li>
                  <li>• Processing time: 1-3 confirmations</li>
                </ul>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};