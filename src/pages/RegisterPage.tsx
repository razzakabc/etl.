import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, MessageCircle, Eye, EyeOff, Zap, User, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const RegisterPage: React.FC = () => {
  const [signupMethod, setSignupMethod] = useState<'email' | 'phone' | 'telegram'>('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    telegramUsername: '',
    referralCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signupMethod !== 'telegram') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    setIsLoading(true);
    const success = await register(formData, signupMethod);

    if (!success) {
      setError('Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  const handleTelegramSignup = () => {
    // Simulate Telegram signup
    const telegramData = {
      telegramUsername: 'demo_user',
      telegramId: 'demo_user_123',
      referralCode: formData.referralCode,
    };
    register(telegramData, 'telegram');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto h-16 w-16 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-xl flex items-center justify-center shadow-etl"
          >
            <Zap className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-3xl font-bold text-white font-display"
          >
            Join ETL Finance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-sm text-gray-400"
          >
            Create your account and start earning today
          </motion.p>
        </div>

        {/* Signup Method Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-1"
        >
          {[
            { key: 'email', label: 'Email', icon: Mail },
            { key: 'phone', label: 'Phone', icon: Phone },
            { key: 'telegram', label: 'Telegram', icon: MessageCircle },
          ].map((method) => (
            <button
              key={method.key}
              onClick={() => setSignupMethod(method.key as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-all ${
                signupMethod === method.key
                  ? 'bg-gradient-to-r from-etl-primary to-etl-secondary text-white shadow-glow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <method.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{method.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Registration Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {signupMethod === 'telegram' ? (
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Gift className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="referralCode"
                    type="text"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-white/20 placeholder-gray-400 text-white bg-white/5 backdrop-blur-glass rounded-lg focus:outline-none focus:ring-2 focus:ring-etl-primary focus:border-transparent transition-all"
                    placeholder="Referral Code (Optional)"
                  />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleTelegramSignup}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-glow transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Sign up with Telegram</span>
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {signupMethod === 'email' ? (
                      <Mail className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Phone className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    name={signupMethod}
                    type={signupMethod === 'email' ? 'email' : 'tel'}
                    required
                    value={formData[signupMethod]}
                    onChange={handleChange}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-white/20 placeholder-gray-400 text-white bg-white/5 backdrop-blur-glass rounded-lg focus:outline-none focus:ring-2 focus:ring-etl-primary focus:border-transparent transition-all"
                    placeholder={signupMethod === 'email' ? 'Email address' : 'Phone number'}
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-white/20 placeholder-gray-400 text-white bg-white/5 backdrop-blur-glass rounded-lg focus:outline-none focus:ring-2 focus:ring-etl-primary focus:border-transparent transition-all"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-white/20 placeholder-gray-400 text-white bg-white/5 backdrop-blur-glass rounded-lg focus:outline-none focus:ring-2 focus:ring-etl-primary focus:border-transparent transition-all"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Gift className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="referralCode"
                    type="text"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-white/20 placeholder-gray-400 text-white bg-white/5 backdrop-blur-glass rounded-lg focus:outline-none focus:ring-2 focus:ring-etl-primary focus:border-transparent transition-all"
                    placeholder="Referral Code (Optional)"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-etl-primary to-etl-secondary text-white py-3 px-4 rounded-lg font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Create Account'}
              </motion.button>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-etl-primary hover:text-etl-secondary transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};