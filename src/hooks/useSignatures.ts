import { Commitment, TransactionError } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import useSWR from 'swr';

type SignatureInfo = {
  blockTime: number;
  confirmationStatus: Commitment;
  err: TransactionError;
  memo: string | null;
  signature: string;
  slot: number;
};

export const useSignatures = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const fetchSignatures = async () => {
    try {
      return (await connection.getSignaturesForAddress(publicKey, {
        limit: 5
      })) as SignatureInfo[];
    } catch (err) {
      console.error(err);
    }
  };

  const { data, error } = useSWR<SignatureInfo[]>(
    'signatures',
    fetchSignatures,
    {
      refreshInterval: 1000 // Revalidate signature information every 1000ms
    }
  );

  return {
    signatures: data,
    isLoading: !error && !data,
    isError: error
  };
};
