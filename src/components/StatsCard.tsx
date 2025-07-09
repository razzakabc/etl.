import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change?: string;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
  delay = 0,
}) => {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      'etl-primary': 'from-etl-primary to-etl-secondary',
      'etl-secondary': 'from-etl-secondary to-purple-600',
      'etl-success': 'from-etl-success to-green-600',
      'etl-gold': 'from-etl-gold to-yellow-500',
      'etl-accent': 'from-etl-accent to-cyan-500',
    };
    return colorMap[color] || colorMap['etl-primary'];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -8 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group cursor-pointer"
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(color)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Animated background particles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-16 translate-x-16" />
      
      <div className="flex items-center justify-between">
        <div className="flex-1 relative z-10">
          <p className="text-sm font-medium text-gray-400 mb-2">{title}</p>
          <motion.p
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            className="text-3xl font-bold text-white font-display mb-2"
          >
            {value}
          </motion.p>
          {change && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.4 }}
              className={`flex items-center space-x-1 text-sm ${
              change.startsWith('+') ? 'text-etl-success' : 
              change.startsWith('-') ? 'text-red-400' : 
              'text-gray-400'
            }`}>
              <motion.div
                animate={{ rotate: change.startsWith('+') ? 0 : 180 }}
                className="w-3 h-3"
              >
                <svg viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 2L10 8H2L6 2Z" />
                </svg>
              </motion.div>
              <span className="font-medium">{change}</span>
            </motion.div>
          )}
        </div>
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className={`relative p-4 rounded-2xl bg-gradient-to-r ${getColorClasses(color)} shadow-lg group-hover:shadow-glow transition-all`}
        >
          <Icon className="h-7 w-7 text-white relative z-10" />
          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
      
      {/* Bottom accent line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 1, delay: delay + 0.6 }}
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${getColorClasses(color)} rounded-full`}
      />
    </motion.div>
  );
};