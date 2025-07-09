import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', earnings: 45.2 },
  { name: 'Tue', earnings: 52.8 },
  { name: 'Wed', earnings: 48.9 },
  { name: 'Thu', earnings: 61.3 },
  { name: 'Fri', earnings: 58.7 },
  { name: 'Sat', earnings: 67.1 },
  { name: 'Sun', earnings: 72.4 },
];

export const EarningsChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Weekly Earnings</h3>
        <div className="text-sm text-gray-400">Last 7 days</div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#0EA5E9"
              strokeWidth={3}
              dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0EA5E9', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-lg font-bold text-white">$406.4</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Average</p>
          <p className="text-lg font-bold text-white">$58.1</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Best Day</p>
          <p className="text-lg font-bold text-crypto-success">$72.4</p>
        </div>
      </div>
    </motion.div>
  );
};