import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Clock, Coins } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'stake',
    amount: 100000,
    status: 'completed',
    date: '2024-01-20 14:30',
    description: 'ETL Staking'
  },
  {
    id: 2,
    type: 'withdrawal',
    amount: -15000,
    status: 'pending',
    date: '2024-01-19 09:15',
    description: 'USDT Withdrawal'
  },
  {
    id: 3,
    type: 'deposit',
    amount: 250000,
    status: 'completed',
    date: '2024-01-18 16:45',
    description: 'USDT Deposit'
  },
  {
    id: 4,
    type: 'reward',
    amount: 1000,
    status: 'completed',
    date: '2024-01-18 12:20',
    description: 'Daily Staking Reward'
  },
];

export const TransactionHistory: React.FC = () => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'withdrawal':
        return <ArrowUpRight className="h-5 w-5 text-red-400" />;
      case 'deposit':
        return <ArrowDownLeft className="h-5 w-5 text-etl-success" />;
      case 'stake':
        return <Coins className="h-5 w-5 text-etl-primary" />;
      case 'reward':
        return <Clock className="h-5 w-5 text-etl-gold" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-etl-success bg-etl-success/20';
      case 'pending':
        return 'text-etl-warning bg-etl-warning/20';
      case 'failed':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white font-display">Transaction History</h3>
        <button className="text-etl-primary hover:text-etl-secondary text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/10 rounded-lg">
                {getTransactionIcon(transaction.type)}
              </div>
              <div>
                <p className="font-medium text-white">{transaction.description}</p>
                <p className="text-sm text-gray-400">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${
                transaction.amount > 0 ? 'text-etl-success' : 'text-white'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount).toLocaleString()} ETL
              </p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};