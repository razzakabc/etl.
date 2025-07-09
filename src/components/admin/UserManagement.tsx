import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MoreVertical, Ban, CheckCircle, XCircle, Edit } from 'lucide-react';

const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    phone: '+1234567890',
    signupMethod: 'email',
    etlBalance: 250000,
    totalStaked: 200000,
    totalEarned: 25000,
    status: 'active',
    joinedAt: '2024-01-15',
    lastActive: '2024-01-20',
    referralCode: 'USER001',
  },
  {
    id: '2',
    email: 'jane@example.com',
    signupMethod: 'telegram',
    etlBalance: 150000,
    totalStaked: 100000,
    totalEarned: 15000,
    status: 'active',
    joinedAt: '2024-01-10',
    lastActive: '2024-01-19',
    referralCode: 'USER002',
  },
  {
    id: '3',
    phone: '+9876543210',
    signupMethod: 'phone',
    etlBalance: 0,
    totalStaked: 50000,
    totalEarned: 5000,
    status: 'blocked',
    joinedAt: '2024-01-05',
    lastActive: '2024-01-18',
    referralCode: 'USER003',
  },
];

export const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter(user =>
    (user.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.phone?.includes(searchTerm)) ||
    user.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-etl-success" />;
      case 'blocked':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Ban className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-etl-success bg-etl-success/20';
      case 'blocked':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary w-80"
          />
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary">
            <option>All Status</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>
          <select className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary">
            <option>All Methods</option>
            <option>Email</option>
            <option>Phone</option>
            <option>Telegram</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  ETL Balance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Staked
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Earned
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {(user.email || user.phone || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {user.email || user.phone || 'Telegram User'}
                        </div>
                        <div className="text-sm text-gray-400">
                          {user.signupMethod} • {user.referralCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {user.etlBalance.toLocaleString()} ETL
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-etl-primary">
                      {user.totalStaked.toLocaleString()} ETL
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-etl-success">
                      {user.totalEarned.toLocaleString()} ETL
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.joinedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          user.status === 'active'
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-etl-success/20 text-etl-success hover:bg-etl-success/30'
                        }`}
                      >
                        {user.status === 'active' ? 'Block' : 'Activate'}
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {filteredUsers.length} of {users.length} users
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