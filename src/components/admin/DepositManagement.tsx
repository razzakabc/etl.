import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';

const mockDeposits = [
  {
    id: 'DEP001',
    userId: 'user123',
    userEmail: 'john@example.com',
    usdtAmount: 1000,
    etlAmount: 250000,
    txHash: '0x123abc...def456',
    status: 'completed',
    date: '2024-01-20 14:30',
    confirmations: 12,
  },
  {
    id: 'DEP002',
    userId: 'user456',
    userEmail: 'jane@example.com',
    usdtAmount: 500,
    etlAmount: 125000,
    txHash: '0x789ghi...jkl012',
    status: 'pending',
    date: '2024-01-20 12:15',
    confirmations: 1,
  },
  {
    id: 'DEP003',
    userId: 'user789',
    userEmail: 'mike@example.com',
    usdtAmount: 2000,
    etlAmount: 500000,
    txHash: '0x345mno...pqr678',
    status: 'failed',
    date: '2024-01-20 10:45',
    confirmations: 0,
  },
];

export const DepositManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deposits, setDeposits] = useState(mockDeposits);

  const filteredDeposits = deposits.filter(deposit => {
    const matchesSearch = deposit.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deposit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deposit.txHash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || deposit.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const updateDepositStatus = (depositId: string, newStatus: string) => {
    setDeposits(prev => prev.map(deposit => 
      deposit.id === depositId 
        ? { ...deposit, status: newStatus }
        : deposit
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-etl-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-etl-warning" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
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
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search deposits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary w-80"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Deposits Table */}
      <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Deposit ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  USDT Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  ETL Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredDeposits.map((deposit, index) => (
                <motion.tr
                  key={deposit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{deposit.id}</div>
                      <div className="text-xs text-gray-400">{deposit.txHash}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{deposit.userEmail}</div>
                    <div className="text-xs text-gray-400">{deposit.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      ${deposit.usdtAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-etl-primary">
                      {deposit.etlAmount.toLocaleString()} ETL
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deposit.status)}`}>
                      {getStatusIcon(deposit.status)}
                      <span className="capitalize">{deposit.status}</span>
                    </span>
                    {deposit.status === 'pending' && (
                      <div className="text-xs text-gray-400 mt-1">
                        {deposit.confirmations}/3 confirmations
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {deposit.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {deposit.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateDepositStatus(deposit.id, 'completed')}
                            className="px-3 py-1 bg-etl-success/20 text-etl-success rounded-lg text-xs font-medium hover:bg-etl-success/30 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateDepositStatus(deposit.id, 'failed')}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {deposit.status === 'failed' && (
                        <button
                          onClick={() => updateDepositStatus(deposit.id, 'completed')}
                          className="px-3 py-1 bg-etl-success/20 text-etl-success rounded-lg text-xs font-medium hover:bg-etl-success/30 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Total Deposits (24h)</div>
          <div className="text-xl font-bold text-white">$45,230</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Pending Deposits</div>
          <div className="text-xl font-bold text-etl-warning">12</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">ETL Distributed</div>
          <div className="text-xl font-bold text-etl-success">11.3M ETL</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Failed Deposits</div>
          <div className="text-xl font-bold text-red-400">3</div>
        </div>
      </div>
    </div>
  );
};