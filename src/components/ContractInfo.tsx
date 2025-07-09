import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Shield, Code, Zap, Copy, CheckCircle } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';
import ETLTokenABI from '../contracts/ETLToken.json';

export const ContractInfo: React.FC = () => {
  const { chainId } = useWeb3();
  const [copied, setCopied] = React.useState('');

  const contractAddress = chainId ? ETLTokenABI.networks[chainId as keyof typeof ETLTokenABI.networks]?.address : null;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const contractFeatures = [
    {
      icon: Shield,
      title: 'Secure Staking',
      description: 'Smart contract-based staking with time locks and automatic rewards',
      color: 'from-etl-primary to-etl-secondary'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Fully auditable code deployed on Binance Smart Chain',
      color: 'from-etl-accent to-etl-primary'
    },
    {
      icon: Zap,
      title: 'Gas Efficient',
      description: 'Optimized for low transaction costs on BSC network',
      color: 'from-etl-gold to-etl-warning'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-lg">
          <Code className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white font-display">Smart Contract</h3>
      </div>

      {/* Contract Address */}
      {contractAddress && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Contract Address
          </label>
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg p-3">
            <span className="text-white font-mono text-sm flex-1">
              {contractAddress}
            </span>
            <button
              onClick={() => copyToClipboard(contractAddress, 'address')}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              {copied === 'address' ? (
                <CheckCircle className="h-4 w-4 text-etl-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <a
              href={`https://bscscan.com/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="space-y-4 mb-6">
        <h4 className="text-lg font-semibold text-white font-display">Features</h4>
        <div className="grid grid-cols-1 gap-4">
          {contractFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className={`p-2 bg-gradient-to-r ${feature.color} rounded-lg`}>
                <feature.icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h5 className="text-white font-medium">{feature.title}</h5>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contract Functions */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white font-display">Available Functions</h4>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">stake(amount)</span>
              <span className="text-etl-primary">Stake ETL tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">unstake()</span>
              <span className="text-etl-primary">Unstake after lock period</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">balanceOf(address)</span>
              <span className="text-etl-primary">Check token balance</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">stakes(address)</span>
              <span className="text-etl-primary">View stake information</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Info */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="text-xs text-gray-400 space-y-1">
          <p>Network: Binance Smart Chain</p>
          <p>Token Standard: BEP-20</p>
          <p>Decimals: 18</p>
          <p>Symbol: ETL</p>
        </div>
      </div>

      {/* Verification Links */}
      <div className="mt-4 flex space-x-4">
        {contractAddress && (
          <>
            <a
              href={`https://bscscan.com/address/${contractAddress}#code`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-etl-primary hover:text-etl-secondary text-sm transition-colors"
            >
              <Code className="h-4 w-4" />
              <span>View Source</span>
            </a>
            <a
              href={`https://bscscan.com/address/${contractAddress}#readContract`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-etl-primary hover:text-etl-secondary text-sm transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Read Contract</span>
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
};