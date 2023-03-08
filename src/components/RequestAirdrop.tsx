import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from '../utils/notifications';
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';

export const RequestAirdrop = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      console.log('error', 'Wallet not connected!');
      notify({
        type: 'error',
        message: 'error',
        description: 'Wallet not connected!',
      });
      return;
    }

    let signature: TransactionSignature = '';

    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);

      // Get the lates block hash to use on our transaction and confirmation
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      );

      notify({
        type: 'success',
        message: 'Airdrop successful!',
        txid: signature,
      });

      getUserSOLBalance(publicKey, connection);
    } catch (error: any) {
      notify({
        type: 'error',
        message: 'Airdrop failed!',
        description: error?.message,
        txid: signature,
      });
      console.log('error', `Airdrop failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection, getUserSOLBalance]);

  return (
    <div className='flex flex-row justify-center'>
      <div className='group relative items-center'>
        <div
          className='animate-tilt absolute -inset-0.5 m-1 rounded-lg bg-gradient-to-r
                    from-indigo-500 to-fuchsia-500 opacity-20 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
        />

        <button
          className='btn m-2 animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 px-8 text-black hover:from-white hover:to-purple-300'
          onClick={onClick}
        >
          <span>Airdrop 1 </span>
        </button>
      </div>
    </div>
  );
};
