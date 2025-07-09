import React, { createContext, useContext, useState } from 'react';

interface SystemSettings {
  dailyProfitRate: number;
  stakingLockDuration: number;
  usdtToEtlRate: number;
  etlToUsdtRate: number;
  referralCommissions: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
  };
  binanceApiKey: string;
  binanceApiSecret: string;
  mainWalletAddress: string;
  telegramSupport: string;
  supportEnabled: boolean;
  websiteLogo: string;
  websiteName: string;
}

interface SettingsContextType {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

const defaultSettings: SystemSettings = {
  dailyProfitRate: 1.0,
  stakingLockDuration: 7,
  usdtToEtlRate: 250,
  etlToUsdtRate: 300,
  referralCommissions: {
    level1: 5.0,
    level2: 2.5,
    level3: 1.5,
    level4: 1.0,
  },
  binanceApiKey: '',
  binanceApiSecret: '',
  mainWalletAddress: '0xB77edea3885865FD4a77629d22BC46F9350b620E',
  telegramSupport: '@etlfinance_support',
  supportEnabled: true,
  websiteLogo: '',
  websiteName: 'ETL Finance',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};