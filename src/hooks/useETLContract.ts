import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import ETLTokenABI from '../contracts/ETLToken.json';

interface ContractState {
  contract: ethers.Contract | null;
  balance: string;
  totalSupply: string;
  stakeInfo: {
    amount: string;
    timestamp: number;
    lockPeriod: number;
  } | null;
  isLoading: boolean;
  error: string | null;
}

export const useETLContract = () => {
  const { provider, signer, account, chainId, isConnected } = useWeb3();
  const [state, setState] = useState<ContractState>({
    contract: null,
    balance: '0',
    totalSupply: '0',
    stakeInfo: null,
    isLoading: false,
    error: null,
  });

  // Initialize contract
  useEffect(() => {
    if (!provider || !signer || !chainId) {
      setState(prev => ({ ...prev, contract: null }));
      return;
    }

    try {
      const contractAddress = ETLTokenABI.networks[chainId as keyof typeof ETLTokenABI.networks]?.address;
      
      if (!contractAddress) {
        setState(prev => ({ 
          ...prev, 
          error: `Contract not deployed on chain ${chainId}`,
          contract: null 
        }));
        return;
      }

      const contract = new ethers.Contract(contractAddress, ETLTokenABI.abi, signer);
      setState(prev => ({ ...prev, contract, error: null }));
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: error.message,
        contract: null 
      }));
    }
  }, [provider, signer, chainId]);

  // Load contract data
  const loadContractData = useCallback(async () => {
    if (!state.contract || !account) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const [balance, totalSupply, stakeInfo] = await Promise.all([
        state.contract.balanceOf(account),
        state.contract.totalSupply(),
        state.contract.stakes(account),
      ]);

      setState(prev => ({
        ...prev,
        balance: ethers.formatEther(balance),
        totalSupply: ethers.formatEther(totalSupply),
        stakeInfo: {
          amount: ethers.formatEther(stakeInfo.amount),
          timestamp: Number(stakeInfo.timestamp),
          lockPeriod: Number(stakeInfo.lockPeriod),
        },
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  }, [state.contract, account]);

  // Stake tokens
  const stakeTokens = useCallback(async (amount: string) => {
    if (!state.contract) throw new Error('Contract not initialized');

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const amountWei = ethers.parseEther(amount);
      const tx = await state.contract.stake(amountWei);
      await tx.wait();
      
      // Reload data after successful transaction
      await loadContractData();
      
      return tx.hash;
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error(error.message);
    }
  }, [state.contract, loadContractData]);

  // Unstake tokens
  const unstakeTokens = useCallback(async () => {
    if (!state.contract) throw new Error('Contract not initialized');

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const tx = await state.contract.unstake();
      await tx.wait();
      
      // Reload data after successful transaction
      await loadContractData();
      
      return tx.hash;
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error(error.message);
    }
  }, [state.contract, loadContractData]);

  // Transfer tokens
  const transferTokens = useCallback(async (to: string, amount: string) => {
    if (!state.contract) throw new Error('Contract not initialized');

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const amountWei = ethers.parseEther(amount);
      const tx = await state.contract.transfer(to, amountWei);
      await tx.wait();
      
      // Reload data after successful transaction
      await loadContractData();
      
      return tx.hash;
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error(error.message);
    }
  }, [state.contract, loadContractData]);

  // Load data when contract is ready
  useEffect(() => {
    if (state.contract && account && isConnected) {
      loadContractData();
    }
  }, [state.contract, account, isConnected, loadContractData]);

  return {
    ...state,
    stakeTokens,
    unstakeTokens,
    transferTokens,
    refreshData: loadContractData,
  };
};