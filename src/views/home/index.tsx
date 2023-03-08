// Next, React
import { useEffect } from 'react';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className='mx-auto p-4 md:hero'>
      <div className='flex flex-col md:hero-content'>
        <div className='mt-6'>
          <div className='mt-4 text-right align-bottom text-sm font-normal text-slate-600'>
            v{pkg.version}
          </div>
          <h1 className='mb-4 bg-gradient-to-br from-indigo-500 to-fuchsia-500 bg-clip-text text-center text-5xl font-bold text-transparent md:pl-12'>
            Solana Next
          </h1>
        </div>
        <h4 className='text-2x1 my-2 text-center text-slate-300 md:w-full md:text-4xl'>
          <p>
            Unleash the full power of blockchain with Solana and Next.js 13.
          </p>
          <p className='text-2x1 leading-relaxed text-slate-500'>
            Full-stack Solana applications made easy.
          </p>
        </h4>
        <div className='group relative'>
          <div className='animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-500 opacity-40 blur' />
          <div className='mockup-code mx-auto my-2 max-w-md border-2 border-[#5252529f] bg-primary p-6 px-10'>
            <pre data-prefix='>'>
              <code className='truncate'>
                {'npx create-solana-dapp <dapp-name>'}{' '}
              </code>
            </pre>
          </div>
        </div>
        <div className='mt-2 flex flex-col'>
          <RequestAirdrop />
          <h4 className='my-2 text-2xl text-slate-300 md:w-full'>
            {wallet && (
              <div className='flex flex-row justify-center'>
                <div>{(balance || 0).toLocaleString()}</div>
                <div className='ml-2 text-slate-600'>SOL</div>
              </div>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};
