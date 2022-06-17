import { ChangeEvent, useState } from 'react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature
} from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { notify } from 'utils/notifications';
import { useSWRConfig } from 'swr';

export const TransactionForm = () => {
  const { mutate } = useSWRConfig();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<number>();
  const [receiverAddress, setReceiverAddress] = useState('');

  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    if (newAmount <= 0) setAmount(null);
    setAmount(newAmount);
  };

  const onSend = async () => {
    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      console.log('error', `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = '';

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(receiverAddress),
          lamports: LAMPORTS_PER_SOL * amount
        })
      );

      signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      // Mutate SWR cache to view updated balance and transacion history
      mutate('signatures');
      mutate('balance');

      notify({
        type: 'success',
        message: 'Transaction successful!',
        txid: signature
      });
    } catch (error: any) {
      notify({
        type: 'error',
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature
      });
      console.log('error', `Transaction failed! ${error?.message}`, signature);
      return;
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-base-300 p-4 shadow-lg">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Amount (in SOL) to send:</span>
        </label>
        <input
          className="input-bordered input w-full"
          onChange={onAmountChange}
          placeholder="Enter amount"
          step={0.001}
          type="number"
          value={amount}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Send SOL to:</span>
        </label>
        <input
          className="input-bordered input w-full"
          onChange={e => setReceiverAddress(e.target.value)}
          placeholder="Enter address"
          type="text"
          value={receiverAddress}
        />
      </div>
      <div>
        <button
          className="btn mt-4 animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] px-8 hover:from-pink-500 hover:to-yellow-500"
          disabled={!(amount && receiverAddress)}
          onClick={onSend}
        >
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
