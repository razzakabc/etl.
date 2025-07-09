import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const mockWithdrawals = [
  {
    id: 'WTH001',
    userId: 'user123',
    userEmail: 'john@example.com',
    etlAmount: 30000,
    usdtAmount: 100,
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C',
    status: 'pending',
    date: '2024-01-20 14:30',
    requestedAt: '2024-01-20 14:30',
  },
  {
    id: 'WTH002',
    userId: 'user456',
    userEmail: 'jane@example.com',
    etlAmount: 15000,
    usdtAmount: 50,
    walletAddress: '0x123abc456def789ghi012jkl345mno678pqr901st',
    status: 'completed',
    date: '2024-01-19 09:15',
    requestedAt: '2024-01-19 09:15',
    processedAt: '2024-01-19 15:30',
    txHash: '0x987fed654cba321hgf098lkj765nmo432pqr109st',
  },
  {
    id: 'WTH003',
    userId: 'user789',
    userEmail: 'mike@example.com',
    etlAmount: 60000,
    usdtAmount: 200,
    walletAddress: '0x345mno678pqr901stu234vwx567yza890bcd123ef',
    status: 'rejected',
    date: '2024-01-18 16:45',
    requestedAt: '2024-01-18 16:45',
    rejectedAt: '2024-01-18 18:00',
    rejectionReason: 'Insufficient verification',
  },
];

export const WithdrawalManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = withdrawal.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         withdrawal.walletAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || withdrawal.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const updateWithdrawalStatus = (withdrawalId: string, newStatus: string, reason?: string) => {
    setWithdrawals(prev => prev.map(withdrawal => 
      withdrawal.id === withdrawalId 
        ? { 
            ...withdrawal, 
            status: newStatus,
            ...(newStatus === 'completed' && { processedAt: new Date().toISOString() }),
            ...(newStatus === 'rejected' && { rejectedAt: new Date().toISOString(), rejectionReason: reason }),
          }
        : withdrawal
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-etl-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-etl-warning" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-etl-success bg-etl-success/20';
      case 'pending':
        return 'text-etl-warning bg-etl-warning/20';
      case 'rejected':
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
              placeholder="Search withdrawals..."
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
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Withdrawals Table */}
      <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Withdrawal ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Wallet Address
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
              {filteredWithdrawals.map((withdrawal, index) => (
                <motion.tr
                  key={withdrawal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{withdrawal.id}</div>
                      {withdrawal.txHash && (
                        <div className="text-xs text-gray-400">{withdrawal.txHash}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{withdrawal.userEmail}</div>
                    <div className="text-xs text-gray-400">{withdrawal.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {withdrawal.etlAmount.toLocaleString()} ETL
                    </div>
                    <div className="text-xs text-etl-primary">
                      ≈ ${withdrawal.usdtAmount} USDT
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300 font-mono">
                      {withdrawal.walletAddress.slice(0, 10)}...{withdrawal.walletAddress.slice(-8)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                      {getStatusIcon(withdrawal.status)}
                      <span className="capitalize">{withdrawal.status}</span>
                    </span>
                    {withdrawal.rejectionReason && (
                      <div className="text-xs text-red-400 mt-1">
                        {withdrawal.rejectionReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <div>Requested: {withdrawal.requestedAt}</div>
                    {withdrawal.processedAt && (
                      <div className="text-etl-success">Processed: {withdrawal.processedAt}</div>
                    )}
                    {withdrawal.rejectedAt && (
                      <div className="text-red-400">Rejected: {withdrawal.rejectedAt}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {withdrawal.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateWithdrawalStatus(withdrawal.id, 'completed')}
                            className="px-3 py-1 bg-etl-success/20 text-etl-success rounded-lg text-xs font-medium hover:bg-etl-success/30 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Rejection reason:');
                              if (reason) updateWithdrawalStatus(withdrawal.id, 'rejected', reason);
                            }}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {withdrawal.status === 'rejected' && (
                        <button
                          onClick={() => updateWithdrawalStatus(withdrawal.id, 'completed')}
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
          <div className="text-sm text-gray-400">Pending Withdrawals</div>
          <div className="text-xl font-bold text-etl-warning">8</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Total Withdrawn (24h)</div>
          <div className="text-xl font-bold text-white">$12,450</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">ETL Withdrawn</div>
          <div className="text-xl font-bold text-etl-primary">3.7M ETL</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Rejected Requests</div>
          <div className="text-xl font-bold text-red-400">2</div>
        </div>
      </div>
    </div>
  );
};