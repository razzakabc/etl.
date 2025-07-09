import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatsCard } from '../components/StatsCard';
import { UserManagement } from '../components/admin/UserManagement';
import { DepositManagement } from '../components/admin/DepositManagement';
import { WithdrawalManagement } from '../components/admin/WithdrawalManagement';
import { SystemSettings } from '../components/admin/SystemSettings';
import { WebsiteManagement } from '../components/admin/WebsiteManagement';
import { AdminLogs } from '../components/admin/AdminLogs';
import { Users, Activity, Settings, DollarSign, Globe, FileText } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'deposits', label: 'Deposits', icon: DollarSign },
    { id: 'withdrawals', label: 'Withdrawals', icon: Activity },
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'website', label: 'Website', icon: Globe },
    { id: 'logs', label: 'Logs', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'deposits':
        return <DepositManagement />;
      case 'withdrawals':
        return <WithdrawalManagement />;
      case 'settings':
        return <SystemSettings />;
      case 'website':
        return <WebsiteManagement />;
      case 'logs':
        return <AdminLogs />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white font-display">Admin Panel</h1>
          <p className="text-gray-400 mt-1">
            Manage platform settings, users, and monitor system activity
          </p>
        </motion.div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="2,456"
            icon={Users}
            color="etl-primary"
            change="+15.3%"
          />
          <StatsCard
            title="Active Stakes"
            value="1,892"
            icon={Activity}
            color="etl-success"
            change="+8.7%"
          />
          <StatsCard
            title="Total Volume"
            value="$2.4M"
            icon={DollarSign}
            color="etl-gold"
            change="+22.1%"
          />
          <StatsCard
            title="Platform Revenue"
            value="$45,230"
            icon={Settings}
            color="etl-secondary"
            change="+18.9%"
          />
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-white/10">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-etl-primary text-etl-primary'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};