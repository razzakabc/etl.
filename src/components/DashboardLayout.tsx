import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Zap, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSettings();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    ...(user?.role === 'admin' ? [{ name: 'Admin Panel', href: '/admin', icon: Shield }] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-etl-primary/10 to-etl-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-etl-gold/10 to-etl-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-etl-success/10 to-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/20 backdrop-blur-glass border-r border-white/10 transform transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full relative">
          {/* Sidebar background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-etl-primary/20 to-transparent rounded-full blur-2xl" />
          
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 relative z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="h-10 w-10 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-xl flex items-center justify-center shadow-glow">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-display">{settings.websiteName}</span>
            </motion.div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-3 relative z-10">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-etl-primary/20 to-etl-secondary/20 text-etl-primary border border-etl-primary/30 shadow-glow'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-gradient-to-r from-etl-primary/10 to-etl-secondary/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10"
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  <span className="font-medium relative z-10">{item.name}</span>
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Actions */}
          <div className="p-4 border-t border-white/10 relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 mb-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
            >
              <div className="h-12 w-12 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-sm font-bold text-white">
                  {user?.email?.charAt(0).toUpperCase() || user?.phone?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate font-display">
                  {user?.email || user?.phone || user?.telegramUsername}
                </p>
                <p className="text-xs text-etl-primary truncate">
                  {user?.role === 'admin' ? 'Administrator' : 'User'}
                </p>
              </div>
            </motion.div>

            <div className="flex items-center justify-between space-x-2">
              <button
                onClick={toggleTheme}
                className="p-3 text-gray-400 hover:text-white transition-all rounded-xl hover:bg-white/10 hover:scale-110"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-all px-3 py-2 rounded-xl hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/10"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-xl flex items-center justify-center shadow-glow">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white font-display">{settings.websiteName}</span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <main className="p-4 lg:p-8 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};