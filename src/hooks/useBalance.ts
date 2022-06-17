import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import useSWR from 'swr';

export const useBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const fetchBalance = async () => {
    try {
      const res = await connection.getBalance(publicKey, 'confirmed');
      return res / LAMPORTS_PER_SOL;
    } catch (e) {
      console.log(`error getting balance: `, e);
    }
  };

  const { data, error } = useSWR<number>(
    publicKey ? 'balance' : null, // Fetch balance conditionally
    fetchBalance
  );

  return {
    balance: data,
    isLoading: !error && !data,
    isError: error
  };
};
