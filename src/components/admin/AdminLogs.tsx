import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Filter, Calendar, User, Settings, Activity } from 'lucide-react';

const mockLogs = [
  {
    id: 1,
    type: 'user_action',
    action: 'User Registration',
    user: 'john@example.com',
    details: 'New user registered via email',
    timestamp: '2024-01-20 14:30:25',
    ip: '192.168.1.100',
    status: 'success',
  },
  {
    id: 2,
    type: 'admin_action',
    action: 'Settings Updated',
    user: 'admin@etlfinance.com',
    details: 'Daily profit rate changed from 0.8% to 1.0%',
    timestamp: '2024-01-20 13:15:10',
    ip: '192.168.1.50',
    status: 'success',
  },
  {
    id: 3,
    type: 'transaction',
    action: 'Withdrawal Approved',
    user: 'jane@example.com',
    details: 'Withdrawal of 15,000 ETL approved',
    timestamp: '2024-01-20 12:45:33',
    ip: '192.168.1.75',
    status: 'success',
  },
  {
    id: 4,
    type: 'system',
    action: 'Database Connection',
    user: 'system',
    details: 'Database connection test failed',
    timestamp: '2024-01-20 11:20:15',
    ip: 'localhost',
    status: 'error',
  },
  {
    id: 5,
    type: 'security',
    action: 'Failed Login Attempt',
    user: 'unknown@hacker.com',
    details: 'Multiple failed login attempts detected',
    timestamp: '2024-01-20 10:55:42',
    ip: '203.0.113.45',
    status: 'warning',
  },
];

export const AdminLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'user_action':
        return <User className="h-4 w-4 text-etl-primary" />;
      case 'admin_action':
        return <Settings className="h-4 w-4 text-etl-secondary" />;
      case 'transaction':
        return <Activity className="h-4 w-4 text-etl-success" />;
      case 'system':
        return <Settings className="h-4 w-4 text-etl-accent" />;
      case 'security':
        return <User className="h-4 w-4 text-red-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-etl-success bg-etl-success/20';
      case 'warning':
        return 'text-etl-warning bg-etl-warning/20';
      case 'error':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Type', 'Action', 'User', 'Details', 'IP', 'Status'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.type,
        log.action,
        log.user,
        log.details,
        log.ip,
        log.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary w-80"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
          >
            <option value="all">All Types</option>
            <option value="user_action">User Actions</option>
            <option value="admin_action">Admin Actions</option>
            <option value="transaction">Transactions</option>
            <option value="system">System</option>
            <option value="security">Security</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <button
          onClick={exportLogs}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-etl-primary to-etl-secondary text-white rounded-lg hover:shadow-glow transition-all"
        >
          <Download className="h-4 w-4" />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getLogIcon(log.type)}
                      <span className="text-sm text-white capitalize">{log.type.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{log.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{log.user}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300 max-w-xs truncate">{log.details}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400 font-mono">{log.ip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
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
          <div className="text-sm text-gray-400">Total Logs (24h)</div>
          <div className="text-xl font-bold text-white">1,247</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Success Rate</div>
          <div className="text-xl font-bold text-etl-success">98.5%</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Warnings</div>
          <div className="text-xl font-bold text-etl-warning">12</div>
        </div>
        <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg p-4">
          <div className="text-sm text-gray-400">Errors</div>
          <div className="text-xl font-bold text-red-400">3</div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {filteredLogs.length} of {mockLogs.length} logs
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-sm text-gray-400 hover:text-white transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-etl-primary text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-sm text-gray-400 hover:text-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};