import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Zap, Clock, DollarSign } from 'lucide-react';

interface MiningStatusProps {
  isMining: boolean;
  onStart: () => void;
  onStop: () => void;
  startTime: Date | null;
  dailyEarnings: number;
}

export const MiningStatus: React.FC<MiningStatusProps> = ({
  isMining,
  onStart,
  onStop,
  startTime,
  dailyEarnings,
}) => {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMining && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMining, startTime]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Mining Status</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isMining 
            ? 'bg-crypto-success/20 text-crypto-success' 
            : 'bg-gray-600/20 text-gray-400'
        }`}>
          {isMining ? 'Active' : 'Inactive'}
        </div>
      </div>

      {/* Mining Visualization */}
      <div className="relative mb-6">
        <div className="h-32 bg-slate-900/50 rounded-lg flex items-center justify-center relative overflow-hidden">
          {isMining && (
            <>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-crypto-bitcoin/20 rounded-lg"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <Zap className="h-12 w-12 text-crypto-bitcoin" />
              </motion.div>
            </>
          )}
          {!isMining && (
            <div className="text-gray-500">
              <Zap className="h-12 w-12" />
            </div>
          )}
        </div>
      </div>

      {/* Mining Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-primary-400" />
            <span className="text-sm text-gray-400">Runtime</span>
          </div>
          <p className="text-lg font-bold text-white">{elapsedTime}</p>
        </div>
        <div className="bg-slate-900/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-4 w-4 text-crypto-success" />
            <span className="text-sm text-gray-400">Earned Today</span>
          </div>
          <p className="text-lg font-bold text-white">${dailyEarnings.toFixed(4)}</p>
        </div>
      </div>

      {/* Mining Controls */}
      <div className="flex space-x-4">
        {!isMining ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-crypto-success to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-glow transition-all"
          >
            <Play className="h-5 w-5" />
            <span>Start Mining</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStop}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-glow transition-all"
          >
            <Pause className="h-5 w-5" />
            <span>Stop Mining</span>
          </motion.button>
        )}
      </div>

      {/* Mining Info */}
      <div className="mt-4 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
        <p className="text-sm text-primary-300">
          <strong>Mining Rate:</strong> 8% daily return on your active balance
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Earnings are calculated and distributed automatically every hour
        </p>
      </div>
    </motion.div>
  );
};