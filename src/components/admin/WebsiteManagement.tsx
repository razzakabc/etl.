import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, Eye, Globe, MessageCircle, Image } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export const WebsiteManagement: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    websiteName: settings.websiteName,
    websiteLogo: settings.websiteLogo,
    aboutContent: 'ETL Finance is a premium BEP-20 token staking platform that offers secure and profitable investment opportunities.',
    termsContent: 'Terms and conditions content...',
    privacyContent: 'Privacy policy content...',
    missionContent: 'Our mission is to provide the best DeFi staking experience.',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateSettings({
      websiteName: formData.websiteName,
      websiteLogo: formData.websiteLogo,
    });
    setIsSaving(false);
    alert('Website settings saved successfully!');
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Branding Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-lg">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Website Branding</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website Name
            </label>
            <input
              type="text"
              value={formData.websiteName}
              onChange={(e) => handleInputChange('websiteName', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="Enter website name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website Logo
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.websiteLogo}
                onChange={(e) => handleInputChange('websiteLogo', e.target.value)}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
                placeholder="Logo URL or upload"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-etl-accent to-etl-primary text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Preview</h4>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-etl-primary to-etl-secondary rounded-lg flex items-center justify-center">
              {formData.websiteLogo ? (
                <img src={formData.websiteLogo} alt="Logo" className="h-8 w-8 rounded" />
              ) : (
                <Image className="h-6 w-6 text-white" />
              )}
            </div>
            <span className="text-lg font-bold text-white font-display">{formData.websiteName}</span>
          </div>
        </div>
      </motion.div>

      {/* Content Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-etl-gold to-etl-warning rounded-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Content Management</h3>
        </div>

        <div className="space-y-6">
          {[
            { key: 'aboutContent', label: 'About Us', placeholder: 'Enter about us content...' },
            { key: 'termsContent', label: 'Terms & Conditions', placeholder: 'Enter terms and conditions...' },
            { key: 'privacyContent', label: 'Privacy Policy', placeholder: 'Enter privacy policy...' },
            { key: 'missionContent', label: 'Mission Statement', placeholder: 'Enter mission statement...' },
          ].map((section) => (
            <div key={section.key}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {section.label}
              </label>
              <textarea
                rows={4}
                value={formData[section.key as keyof typeof formData]}
                onChange={(e) => handleInputChange(section.key, e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary resize-none"
                placeholder={section.placeholder}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Live Support Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Live Support System</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Telegram Support Username
            </label>
            <input
              type="text"
              value={settings.telegramSupport}
              onChange={(e) => updateSettings({ telegramSupport: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-etl-primary"
              placeholder="@support_username"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-300">Support Button Status</label>
              <p className="text-xs text-gray-400">Show/hide live support button</p>
            </div>
            <button
              onClick={() => updateSettings({ supportEnabled: !settings.supportEnabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.supportEnabled ? 'bg-etl-success' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.supportEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-etl-primary/10 border border-etl-primary/20 rounded-lg">
          <h4 className="text-etl-primary font-medium mb-2">Support Button Preview</h4>
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-etl-primary to-etl-secondary text-white p-3 rounded-full">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="text-white text-sm">Live Support</span>
            <span className={`text-xs ${settings.supportEnabled ? 'text-etl-success' : 'text-gray-400'}`}>
              ({settings.supportEnabled ? 'Enabled' : 'Disabled'})
            </span>
          </div>
        </div>
      </motion.div>

      {/* Admin Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-glass border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Admin Management</h3>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-etl-primary to-etl-secondary text-white rounded-lg hover:shadow-glow transition-all">
            Add Sub-Admin
          </button>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Admin User', email: 'admin@etlfinance.com', role: 'Super Admin', permissions: 'All Access' },
            { name: 'Support Manager', email: 'support@etlfinance.com', role: 'Sub Admin', permissions: 'User Support Only' },
          ].map((admin, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
              <div>
                <div className="text-sm font-medium text-white">{admin.name}</div>
                <div className="text-xs text-gray-400">{admin.email}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-etl-primary">{admin.role}</div>
                <div className="text-xs text-gray-400">{admin.permissions}</div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-etl-primary/20 text-etl-primary rounded text-xs hover:bg-etl-primary/30 transition-colors">
                  Edit
                </button>
                {admin.role !== 'Super Admin' && (
                  <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30 transition-colors">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between items-center"
      >
        <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition-colors">
          <Eye className="h-4 w-4" />
          <span>Preview Website</span>
        </button>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-etl-primary to-etl-secondary text-white rounded-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Save className="h-5 w-5" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </motion.div>
    </div>
  );
};