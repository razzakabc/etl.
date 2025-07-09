import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Coins, 
  ArrowRight,
  Star,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export const LandingPage: React.FC = () => {
  const { settings } = useSettings();

  const features = [
    {
      icon: Coins,
      title: 'BEP-20 Token Staking',
      description: 'Stake ETL tokens and earn 1% daily profit with our secure platform',
      color: 'from-etl-primary to-etl-secondary'
    },
    {
      icon: Shield,
      title: 'Secure & Verified',
      description: 'Bank-grade security with smart contract verification on BSC',
      color: 'from-etl-accent to-etl-primary'
    },
    {
      icon: TrendingUp,
      title: 'Daily Returns',
      description: 'Consistent 1% daily returns with 7-day lock periods',
      color: 'from-etl-gold to-etl-warning'
    },
    {
      icon: Users,
      title: '4-Level Referral',
      description: 'Earn up to 10% commission through our multi-level referral system',
      color: 'from-etl-success to-etl-accent'
    }
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$2.4M+', icon: Coins },
    { label: 'Active Stakers', value: '15,000+', icon: Users },
    { label: 'Daily Rewards Paid', value: '$24,000+', icon: TrendingUp },
    { label: 'Platform Uptime', value: '99.9%', icon: Shield },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="h-10 w-10 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-xl flex items-center justify-center shadow-etl">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-display">{settings.websiteName}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-etl-primary to-etl-secondary text-white px-6 py-2 rounded-lg hover:shadow-glow transition-all"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white font-display">
              Stake <span className="bg-gradient-to-r from-etl-primary to-etl-secondary bg-clip-text text-transparent">ETL</span> Tokens
              <br />
              Earn <span className="bg-gradient-to-r from-etl-gold to-etl-warning bg-clip-text text-transparent">Daily Profits</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the future of DeFi with our premium BEP-20 token staking platform. 
              Deposit USDT, receive ETL tokens, and earn 1% daily returns with our secure smart contracts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-etl-primary to-etl-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-glow transition-all flex items-center space-x-2"
                >
                  <span>Start Staking Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-etl-gold">1 USDT = 250 ETL</div>
                <div className="text-sm text-gray-400">Current Exchange Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-xl mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white font-display">{stat.value}</div>
                <div className="text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
              Why Choose <span className="bg-gradient-to-r from-etl-primary to-etl-secondary bg-clip-text text-transparent">ETL Finance</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of DeFi staking with our premium features and unmatched security.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:shadow-glow transition-all`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
              How It <span className="bg-gradient-to-r from-etl-accent to-etl-primary bg-clip-text text-transparent">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Deposit USDT', desc: 'Send USDT to your assigned wallet address' },
              { step: '02', title: 'Receive ETL', desc: 'Get 250 ETL tokens for every 1 USDT deposited' },
              { step: '03', title: 'Stake & Earn', desc: 'Stake ETL tokens and earn 1% daily profit' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-full text-2xl font-bold text-white font-display mb-6 shadow-etl">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white font-display mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-etl-primary/20 to-etl-secondary/20 backdrop-blur-glass border border-etl-primary/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              Ready to Start <span className="bg-gradient-to-r from-etl-gold to-etl-warning bg-clip-text text-transparent">Earning</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users already earning daily profits with ETL Finance.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="bg-gradient-to-r from-etl-primary to-etl-secondary text-white px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-glow transition-all inline-flex items-center space-x-2"
              >
                <span>Create Account Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Support Button */}
      {settings.supportEnabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <a
            href={`https://t.me/${settings.telegramSupport.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-etl-primary to-etl-secondary text-white p-4 rounded-full shadow-glow hover:shadow-glow-lg transition-all flex items-center space-x-2"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="hidden sm:inline">Live Support</span>
          </a>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="h-10 w-10 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white font-display">{settings.websiteName}</span>
          </div>
          <p className="text-gray-400 mb-4">
            Premium BEP-20 Token Staking Platform
          </p>
          <div className="text-sm text-gray-500">
            © 2024 ETL Finance. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};