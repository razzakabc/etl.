import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

interface Web3State {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

// Custom function to detect Ethereum provider with better error handling
const detectEthereumProvider = async (): Promise<any> => {
  if (typeof window === 'undefined') {
    return null;
  }

  // Check if window.ethereum exists
  if (window.ethereum) {
    return window.ethereum;
  }

  // Wait a bit for MetaMask to load (sometimes it takes time)
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 10;
    
    const checkForEthereum = () => {
      attempts++;
      
      if (window.ethereum) {
        resolve(window.ethereum);
      } else if (attempts >= maxAttempts) {
        resolve(null);
      } else {
        setTimeout(checkForEthereum, 100);
      }
    };
    
    checkForEthereum();
  });
};

export const useWeb3 = () => {
  const [state, setState] = useState<Web3State>({
    provider: null,
    signer: null,
    account: null,
    chainId: null,
    isConnected: false,
    isLoading: false,
    error: null,
  });

  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const ethereumProvider = await detectEthereumProvider();
      
      if (!ethereumProvider) {
        throw new Error('MetaMask not detected. Please install MetaMask.');
      }

      const provider = new ethers.BrowserProvider(ethereumProvider as any);
      
      // Request account access
      await provider.send('eth_requestAccounts', []);
      
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      // Check if we're on BSC Mainnet or Testnet
      if (chainId !== 56 && chainId !== 97) {
        try {
          // Try to switch to BSC Mainnet
          await provider.send('wallet_switchEthereumChain', [
            { chainId: '0x38' } // BSC Mainnet
          ]);
        } catch (switchError: any) {
          // If the chain hasn't been added to MetaMask, add it
          if (switchError.code === 4902) {
            await provider.send('wallet_addEthereumChain', [
              {
                chainId: '0x38',
                chainName: 'Binance Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/'],
              },
            ]);
          }
        }
      }

      setState({
        provider,
        signer,
        account,
        chainId,
        isConnected: true,
        isLoading: false,
        error: null,
      });

    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setState({
      provider: null,
      signer: null,
      account: null,
      chainId: null,
      isConnected: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const switchToNetwork = useCallback(async (chainId: number) => {
    if (!state.provider) return;

    try {
      const hexChainId = `0x${chainId.toString(16)}`;
      await state.provider.send('wallet_switchEthereumChain', [
        { chainId: hexChainId }
      ]);
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
    }
  }, [state.provider]);

  // Listen for account and network changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setState(prev => ({ ...prev, account: accounts[0] }));
      }
    };

    const handleChainChanged = (chainId: string) => {
      setState(prev => ({ ...prev, chainId: parseInt(chainId, 16) }));
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [disconnectWallet]);

  // Auto-connect if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      try {
        const ethereumProvider = await detectEthereumProvider();
        if (ethereumProvider && window.ethereum?.selectedAddress) {
          connectWallet();
        }
      } catch (error) {
        // Silently handle auto-connect errors
        console.debug('Auto-connect failed:', error);
      }
    };

    autoConnect();
  }, [connectWallet]);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    switchToNetwork,
  };
};