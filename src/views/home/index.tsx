// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';

// MS
import Squads from "@sqds/sdk";

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  const [squads, setSquads] = useState<Squads | null>()
  const [multisigAccount, setMultisigAccount] = useState()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  useEffect(() => {
    if (wallet) {
      // By default, the canonical Program IDs for SquadsMPL and ProgramManager will be used
      // The 'wallet' passed in will be the signer/feePayer on all transactions through the Squads object.
      setSquads(Squads.devnet(wallet)); // or Squads.devnet(...); Squads.mainnet(...)
    }
  }, [wallet])

  const onTransfer = async () => {
    const destAddress = Keypair.generate().publicKey;
    const amount = 0.001 * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: destAddress,
        lamports: amount,
      })
    );

    const signature = await wallet.sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, 'confirmed');
    console.log('balance after transfer: ', balance)
  }

  const createMS = async () => {
    if (!squads) {
      console.log("squads not found:", wallet)
      return
    }
    const threshold = 1
    const createKey = Keypair.generate().publicKey;
    const members = [wallet.publicKey];
    const newMultisigAccount = await squads.createMultisig(threshold, createKey, members);
    // setMultisigAccount(newMultisigAccount)
    console.log('account created: ', newMultisigAccount)

  }

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Scaffold Lite <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p>Simply the fastest way to get started.</p>
          Next.js, tailwind, wallet, web3.js, and more.
        </h4>
        <div className="max-w-md mx-auto mockup-code bg-primary p-6 my-2">
          <pre data-prefix=">">
            <code className="truncate">Start building on Solana  </code>
          </pre>
        </div>
        <div className="text-center">
          <RequestAirdrop />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
        </div>

        <button
          className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
          onClick={onTransfer}
        >
          <span>Transfer</span>
        </button>

        <button
          className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
          onClick={createMS}
        >
          <span>Create a MultiSig</span>
        </button>
      </div>
    </div>
  );
};
