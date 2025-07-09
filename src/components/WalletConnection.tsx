import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ExternalLink, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';
import { LoadingSpinner } from './LoadingSpinner';

export const WalletConnection: React.FC = () => {
  const { 
    account, 
    chainId, 
    isConnected, 
    isLoading, 
    error, 
    connectWallet, 
    disconnectWallet,
    switchToNetwork 
  } = useWeb3();

  const [copied, setCopied] = React.useState(false);

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 56: return 'BSC Mainnet';
      case 97: return 'BSC Testnet';
      default: return `Chain ${chainId}`;
    }
  };

  const isCorrectNetwork = chainId === 56 || chainId === 97;

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-etl-primary/20 to-etl-secondary/20 rounded-full blur-3xl -translate-y-16 translate-x-16" />
        
        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mx-auto w-20 h-20 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-2xl flex items-center justify-center mb-6 shadow-glow"
          >
            <Wallet className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white font-display mb-3">Connect Your Wallet</h3>
          <p className="text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed">
            Connect your MetaMask wallet to interact with ETL smart contracts
          </p>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={connectWallet}
            disabled={isLoading}
            className="group relative overflow-hidden bg-gradient-to-r from-etl-primary to-etl-secondary text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <div className="relative flex items-center space-x-3">
                <Wallet className="h-5 w-5" />
                <span>Connect MetaMask</span>
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-etl-success/20 to-transparent rounded-full blur-2xl" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-etl-success rounded-full animate-pulse" />
          <h3 className="text-lg font-bold text-white font-display">Wallet Connected</h3>
        </div>
        <button
          onClick={disconnectWallet}
          className="text-gray-400 hover:text-red-400 text-sm transition-colors px-3 py-1 rounded-lg hover:bg-red-500/10"
        >
          Disconnect
        </button>
      </div>

      {/* Network Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Network:</span>
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-2 h-2 rounded-full ${isCorrectNetwork ? 'bg-etl-success' : 'bg-red-400'}`}
            />
            <span className={`text-sm ${isCorrectNetwork ? 'text-etl-success' : 'text-red-400'}`}>
              {chainId ? getNetworkName(chainId) : 'Unknown'}
            </span>
          </div>
        </div>
        
        {!isCorrectNetwork && (
          <div className="mt-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-3"
            >
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                <div className="text-sm text-amber-300">
                  <p className="font-medium">Wrong Network</p>
                  <p className="text-xs text-amber-200 mt-1">
                    Please switch to Binance Smart Chain to use ETL contracts
                  </p>
                </div>
              </div>
            </motion.div>
            <button
              onClick={() => switchToNetwork(56)}
              className="w-full bg-gradient-to-r from-etl-primary to-etl-secondary text-white py-3 px-4 rounded-xl text-sm font-medium hover:shadow-glow transition-all"
            >
              Switch to BSC Mainnet
            </button>
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-400">Address:</span>
          <div className="flex items-center space-x-2 mt-2 p-3 bg-white/5 rounded-xl">
            <span className="text-white font-mono text-sm flex-1">
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ''}
            </span>
            <button
              onClick={copyAddress}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-etl-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <a
              href={`https://bscscan.com/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Contract Info */}
      {isCorrectNetwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <div className="text-xs text-gray-400 space-y-2 bg-white/5 rounded-xl p-3">
            <p>ETL Contract: 0x742d...4C4C</p>
            <p>Network: {getNetworkName(chainId!)}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};