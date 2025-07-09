import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Lock, TrendingUp, ExternalLink, AlertCircle } from 'lucide-react';
import { useETLContract } from '../hooks/useETLContract';
import { useWeb3 } from '../hooks/useWeb3';
import { LoadingSpinner } from './LoadingSpinner';

export const ContractStaking: React.FC = () => {
  const { isConnected, chainId } = useWeb3();
  const { 
    contract, 
    balance, 
    stakeInfo, 
    isLoading, 
    error, 
    stakeTokens, 
    unstakeTokens 
  } = useETLContract();

  const [stakeAmount, setStakeAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [txLoading, setTxLoading] = useState(false);

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;

    setTxLoading(true);
    setTxHash('');

    try {
      const hash = await stakeTokens(stakeAmount);
      setTxHash(hash);
      setStakeAmount('');
    } catch (error: any) {
      alert(`Staking failed: ${error.message}`);
    } finally {
      setTxLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!stakeInfo || parseFloat(stakeInfo.amount) <= 0) return;

    setTxLoading(true);
    setTxHash('');

    try {
      const hash = await unstakeTokens();
      setTxHash(hash);
    } catch (error: any) {
      alert(`Unstaking failed: ${error.message}`);
    } finally {
      setTxLoading(false);
    }
  };

  const isStakeLocked = () => {
    if (!stakeInfo || parseFloat(stakeInfo.amount) <= 0) return false;
    const unlockTime = (stakeInfo.timestamp + stakeInfo.lockPeriod) * 1000;
    return Date.now() < unlockTime;
  };

  const getUnlockTime = () => {
    if (!stakeInfo) return null;
    const unlockTime = new Date((stakeInfo.timestamp + stakeInfo.lockPeriod) * 1000);
    return unlockTime.toLocaleString();
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-full flex items-center justify-center mb-4 opacity-50">
            <Coins className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display mb-2">Smart Contract Staking</h3>
          <p className="text-gray-400">
            Connect your wallet to interact with ETL smart contracts
          </p>
        </div>
      </motion.div>
    );
  }

  const isCorrectNetwork = chainId === 56 || chainId === 97;

  if (!isCorrectNetwork) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display mb-2">Wrong Network</h3>
          <p className="text-gray-400">
            Please switch to Binance Smart Chain to use smart contract features
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-lg">
          <Coins className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white font-display">Smart Contract Staking</h3>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {txHash && (
        <div className="bg-etl-success/10 border border-etl-success/20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-etl-success text-sm">Transaction successful!</p>
            <a
              href={`https://bscscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-etl-success hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {/* Balance Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">ETL Balance</div>
          <div className="text-xl font-bold text-white">
            {isLoading ? <LoadingSpinner size="sm" /> : `${parseFloat(balance).toFixed(2)} ETL`}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Staked Amount</div>
          <div className="text-xl font-bold text-etl-primary">
            {isLoading ? <LoadingSpinner size="sm" /> : `${stakeInfo ? parseFloat(stakeInfo.amount).toFixed(2) : '0.00'} ETL`}
          </div>
        </div>
      </div>

      {/* Staking Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Stake Amount (ETL)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max={balance}
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
            placeholder="Enter amount to stake"
            disabled={txLoading || isLoading}
          />
          <p className="text-xs text-gray-400 mt-1">
            Available: {parseFloat(balance).toFixed(2)} ETL
          </p>
        </div>

        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStake}
            disabled={!stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > parseFloat(balance) || txLoading || isLoading}
            className="flex-1 bg-gradient-to-r from-etl-primary to-etl-secondary text-white py-3 px-4 rounded-lg font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {txLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Stake</span>
              </>
            )}
          </motion.button>

          {stakeInfo && parseFloat(stakeInfo.amount) > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUnstake}
              disabled={isStakeLocked() || txLoading || isLoading}
              className="flex-1 bg-gradient-to-r from-etl-gold to-etl-warning text-white py-3 px-4 rounded-lg font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {txLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  <span>Unstake</span>
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Stake Info */}
        {stakeInfo && parseFloat(stakeInfo.amount) > 0 && (
          <div className="bg-etl-primary/10 border border-etl-primary/20 rounded-lg p-4">
            <h4 className="text-etl-primary font-medium mb-2">Current Stake</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white">{parseFloat(stakeInfo.amount).toFixed(2)} ETL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lock Period:</span>
                <span className="text-white">{Math.floor(stakeInfo.lockPeriod / 86400)} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Unlock Time:</span>
                <span className={`${isStakeLocked() ? 'text-etl-warning' : 'text-etl-success'}`}>
                  {getUnlockTime()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`${isStakeLocked() ? 'text-etl-warning' : 'text-etl-success'}`}>
                  {isStakeLocked() ? 'Locked' : 'Unlocked'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Contract Info */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <div className="text-xs text-gray-400 space-y-1">
            <p>Smart Contract Features:</p>
            <p>• Decentralized staking on BSC</p>
            <p>• Transparent and immutable</p>
            <p>• No intermediaries required</p>
            <p>• View on BSCScan for verification</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};