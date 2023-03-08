import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  SystemProgram,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from '@solana/web3.js';
import { useCallback } from 'react';
import { notify } from '../utils/notifications';

export const SendTransaction = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: 'error', message: 'Wallet not connected!' });
      console.log('error', 'Send Transaction: Wallet not connected!');
      return;
    }

    let signature: TransactionSignature = '';
    try {
      // Create instructions to send, in this case a simple transfer
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: Keypair.generate().publicKey,
          lamports: 1_000_000,
        }),
      ];

      // Get the lates block hash to use on our transaction and confirmation
      const latestBlockhash = await connection.getLatestBlockhash();

      // Create a new TransactionMessage with version and compile it to legacy
      const messageLegacy = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
      }).compileToLegacyMessage();

      // Create a new VersionedTransacction which supports legacy and v0
      const transation = new VersionedTransaction(messageLegacy);

      // Send transaction and await for signature
      signature = await sendTransaction(transation, connection);

      // Send transaction and await for signature
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      );

      console.log(signature);
      notify({
        type: 'success',
        message: 'Transaction successful!',
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: 'error',
        message: 'Transaction failed!',
        description: error?.message,
        txid: signature,
      });
      console.log('error', `Transaction failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection, sendTransaction]);

  return (
    <div className='flex flex-row justify-center'>
      <div className='group relative items-center'>
        <div
          className='animate-tilt absolute -inset-0.5 m-1 rounded-lg bg-gradient-to-r
                from-indigo-500 to-fuchsia-500 opacity-20 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
        />
        <button
          className='group btn m-2 w-60 animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-black hover:from-white hover:to-purple-300'
          onClick={onClick}
          disabled={!publicKey}
        >
          <div className='hidden group-disabled:block '>
            Wallet not connected
          </div>
          <span className='block group-disabled:hidden'>Send Transaction</span>
        </button>
      </div>
    </div>
  );
};
