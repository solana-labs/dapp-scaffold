import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { ConfirmedSignatureInfo } from '@solana/web3.js';
import useSWR from 'swr';

export const useSignatures = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const fetchSignatures = async () => {
    try {
      return await connection.getSignaturesForAddress(publicKey, {
        limit: 5
      });
    } catch (err) {
      console.error(err);
    }
  };

  const { data, error } = useSWR<ConfirmedSignatureInfo[]>(
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
