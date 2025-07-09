import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email?: string;
  phone?: string;
  telegramUsername?: string;
  telegramId?: string;
  signupMethod: 'email' | 'phone' | 'telegram';
  walletAddress: string;
  usdtDeposited: number;
  etlBalance: number;
  totalStaked: number;
  totalEarned: number;
  referralCode: string;
  referredBy?: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked' | 'pending';
  isVerified: boolean;
  assignedDepositAddress: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any, method: 'email' | 'phone' | 'telegram') => Promise<boolean>;
  register: (userData: any, method: 'email' | 'phone' | 'telegram') => Promise<boolean>;
  logout: () => void;
  updateBalance: (etlAmount: number) => void;
  updateUSDTDeposited: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@etlfinance.com',
    signupMethod: 'email',
    walletAddress: '0xB77edea3885865FD4a77629d22BC46F9350b620E',
    usdtDeposited: 10000,
    etlBalance: 2500000,
    totalStaked: 1000000,
    totalEarned: 150000,
    referralCode: 'ADMIN001',
    role: 'admin',
    status: 'active',
    isVerified: true,
    assignedDepositAddress: '0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    email: 'user@example.com',
    signupMethod: 'email',
    walletAddress: '0x123abc456def789ghi012jkl345mno678pqr901st',
    usdtDeposited: 1000,
    etlBalance: 250000,
    totalStaked: 200000,
    totalEarned: 25000,
    referralCode: 'USER001',
    role: 'user',
    status: 'active',
    isVerified: true,
    assignedDepositAddress: '0x987fed654cba321hgf098lkj765nmo432pqr109st',
    createdAt: '2024-01-15',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('etl_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('etl_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: any, method: 'email' | 'phone' | 'telegram'): Promise<boolean> => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let foundUser: User | undefined;
    
    if (method === 'email') {
      foundUser = mockUsers.find(u => u.email === credentials.email);
    } else if (method === 'phone') {
      foundUser = mockUsers.find(u => u.phone === credentials.phone);
    } else if (method === 'telegram') {
      foundUser = mockUsers.find(u => u.telegramId === credentials.telegramId);
    }
    
    if (foundUser && (credentials.password === 'password' || method === 'telegram')) {
      setUser(foundUser);
      localStorage.setItem('etl_user', JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData: any, method: 'email' | 'phone' | 'telegram'): Promise<boolean> => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      signupMethod: method,
      walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      usdtDeposited: 0,
      etlBalance: 0,
      totalStaked: 0,
      totalEarned: 0,
      referralCode: `ETL${Date.now().toString().slice(-6)}`,
      referredBy: userData.referralCode,
      role: 'user',
      status: 'active',
      isVerified: false,
      assignedDepositAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...userData,
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('etl_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('etl_user');
  };

  const updateBalance = (etlAmount: number) => {
    if (user) {
      const updatedUser = { ...user, etlBalance: user.etlBalance + etlAmount };
      setUser(updatedUser);
      localStorage.setItem('etl_user', JSON.stringify(updatedUser));
    }
  };

  const updateUSDTDeposited = (amount: number) => {
    if (user) {
      const etlAmount = amount * 250; // 1 USDT = 250 ETL
      const updatedUser = { 
        ...user, 
        usdtDeposited: user.usdtDeposited + amount,
        etlBalance: user.etlBalance + etlAmount
      };
      setUser(updatedUser);
      localStorage.setItem('etl_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateBalance,
      updateUSDTDeposited,
    }}>
      {children}
    </AuthContext.Provider>
  );
};